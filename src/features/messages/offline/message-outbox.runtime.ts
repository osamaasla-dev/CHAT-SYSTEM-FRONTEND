import type { InfiniteData } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { queryClient } from "@/shared/lib/query-client";
import { resolveApiErrorMessage } from "@/shared/utils";
import { createMessageApi } from "../services/message.api";
import type { ChatMessagesResponse } from "../types/message.types";
import { replaceOptimisticMessage } from "../utils/send-message-cache.utils";
import { CHAT_MESSAGES_QUERY_KEY } from "../hooks/useChatMessages";
import { messageOutboxRepository } from "./message-outbox.repository";
import {
  computeRetryDelayMs,
  getApiErrorMessage,
  isTransientOutboxError,
} from "./message-outbox-retry-policy";
import type { QueueMessageParams } from "./message-outbox.types";
import { buildOptimisticMessageId } from "./message-outbox-cache.utils";

const OFFLINE_NEXT_KICK_DELAY_MS = 5_000;

const getNowMs = (): number => Date.now();

const isBrowserOffline = (): boolean =>
  typeof navigator !== "undefined" &&
  typeof navigator.onLine === "boolean" &&
  !navigator.onLine;

class MessageOutboxRuntime {
  private isRunning = false;
  private nextRetryTimer: number | null = null;

  async enqueue(params: QueueMessageParams): Promise<void> {
    await messageOutboxRepository.enqueue(params);
    void this.kick();
  }

  async kick(): Promise<void> {
    if (this.isRunning) {
      return;
    }

    if (isBrowserOffline()) {
      await this.scheduleNextKick();
      return;
    }

    this.isRunning = true;
    try {
      await this.processDueMessages();
    } finally {
      this.isRunning = false;
      await this.scheduleNextKick();
    }
  }

  private async processDueMessages(): Promise<void> {
    while (!isBrowserOffline()) {
      const oldestQueuedMessage = await messageOutboxRepository.getOldestQueued();
      if (!oldestQueuedMessage) {
        return;
      }

      const nextRetryAtMs = new Date(oldestQueuedMessage.nextRetryAt).getTime();
      const isMessageDue =
        Number.isNaN(nextRetryAtMs) || nextRetryAtMs <= getNowMs();

      // Strict FIFO: if the oldest message is not due yet, do not send newer ones.
      if (!isMessageDue) {
        return;
      }

      try {
        const response = await createMessageApi({
          chatId: oldestQueuedMessage.chatId,
          content: oldestQueuedMessage.content,
          clientMessageId: oldestQueuedMessage.clientMessageId,
        });

        await messageOutboxRepository.removeByClientMessageId(
          oldestQueuedMessage.clientMessageId,
        );

        const chatMessagesKey = CHAT_MESSAGES_QUERY_KEY(oldestQueuedMessage.chatId);
        const cachedChatMessages =
          queryClient.getQueryData<InfiniteData<ChatMessagesResponse>>(
            chatMessagesKey,
          );

        if (cachedChatMessages) {
          queryClient.setQueryData<InfiniteData<ChatMessagesResponse>>(
            chatMessagesKey,
            (current) =>
              replaceOptimisticMessage(
                current,
                buildOptimisticMessageId(oldestQueuedMessage.clientMessageId),
                response.message,
              ),
          );
        }
      } catch (error) {
        if (isTransientOutboxError(error)) {
          const nextRetryAt = new Date(
            Date.now() + computeRetryDelayMs(oldestQueuedMessage.retryCount),
          ).toISOString();

          await messageOutboxRepository.rescheduleRetry(
            oldestQueuedMessage.clientMessageId,
            nextRetryAt,
            oldestQueuedMessage.retryCount + 1,
          );

          // Preserve strict message ordering: do not send newer messages
          // before this failed one gets retried.
          return;
        }

        await messageOutboxRepository.removeByClientMessageId(
          oldestQueuedMessage.clientMessageId,
        );

        const chatMessagesKey = CHAT_MESSAGES_QUERY_KEY(oldestQueuedMessage.chatId);
        const cachedChatMessages =
          queryClient.getQueryData<InfiniteData<ChatMessagesResponse>>(
            chatMessagesKey,
          );

        if (cachedChatMessages) {
          queryClient.setQueryData<InfiniteData<ChatMessagesResponse>>(
            chatMessagesKey,
            (current) => {
              if (!current || current.pages.length === 0) {
                return current;
              }

              const optimisticMessageId = buildOptimisticMessageId(
                oldestQueuedMessage.clientMessageId,
              );

              return {
                ...current,
                pages: current.pages.map((page) => ({
                  ...page,
                  items: page.items.filter((item) => item.id !== optimisticMessageId),
                })),
              };
            },
          );
        }

        const apiErrorMessage = getApiErrorMessage(error);
        const fallbackMessage =
          apiErrorMessage ??
          (error instanceof Error ? error.message : "Failed to send message");
        toast.error(resolveApiErrorMessage(fallbackMessage));
      }
    }
  }

  private async scheduleNextKick(): Promise<void> {
    if (this.nextRetryTimer !== null) {
      window.clearTimeout(this.nextRetryTimer);
      this.nextRetryTimer = null;
    }

    const nextRetryAt = await messageOutboxRepository.getNextRetryAt();

    if (!nextRetryAt) {
      return;
    }

    const delayMs = Math.max(0, new Date(nextRetryAt).getTime() - Date.now());
    const safeDelayMs = isBrowserOffline()
      ? Math.max(delayMs, OFFLINE_NEXT_KICK_DELAY_MS)
      : delayMs;

    this.nextRetryTimer = window.setTimeout(() => {
      void this.kick();
    }, safeDelayMs + 10);
  }
}

export const messageOutboxRuntime = new MessageOutboxRuntime();
