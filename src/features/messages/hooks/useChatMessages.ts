import { useInfiniteQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { mergeOutboxMessagesWithFetchedMessages } from "../offline/message-outbox-cache.utils";
import { messageOutboxRepository } from "../offline/message-outbox.repository";
import { getChatMessagesApi } from "../services/message.api";
import type { ChatMessagesResponse } from "../types/message.types";

const DEFAULT_LIMIT = 10;

export const CHAT_MESSAGES_QUERY_KEY = (chatId: string) =>
  ["messages", "chat", chatId] as const;

export const useChatMessages = (
  chatId: string,
  limit: number = DEFAULT_LIMIT,
) => {
  return useInfiniteQuery<ChatMessagesResponse, ApiErrorResponse>({
    queryKey: CHAT_MESSAGES_QUERY_KEY(chatId),
    queryFn: async ({ pageParam }) => {
      const response = await getChatMessagesApi({
        chatId,
        limit,
        cursor: typeof pageParam === "string" ? pageParam : undefined,
      });

      const normalizedItems = response.items.map((item) => ({
        ...item,
        wasUnreadOnLoad: !item.isOwn && item.isUnread,
      }));

      if (typeof pageParam === "string") {
        return {
          ...response,
          items: normalizedItems,
        };
      }

      const queuedOutboxMessages = await messageOutboxRepository.listByChatId(
        chatId,
      );

      return {
        ...response,
        items: mergeOutboxMessagesWithFetchedMessages(
          normalizedItems,
          queuedOutboxMessages,
        ),
      };
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.meta.nextCursor ?? undefined,
    enabled: Boolean(chatId),
  });
};
