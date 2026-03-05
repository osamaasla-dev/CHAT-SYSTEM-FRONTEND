import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { resolveApiErrorMessage } from "@/shared/utils";
import type { ChatMessagesResponse } from "../types/message.types";
import type {
  SendMessageMutationContext,
  SendMessageVariables,
} from "../types/send-message.types";
import {
  createOptimisticMessage,
  prependMessageToFirstPage,
  removeMessageById,
} from "../utils/send-message-cache.utils";
import { CHAT_MESSAGES_QUERY_KEY } from "./useChatMessages";
import { messageOutboxRuntime } from "../offline/message-outbox.runtime";

export const SEND_MESSAGE_MUTATION_KEY = (chatId: string) =>
  ["messages", "send", chatId] as const;

export const useSendMessage = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    unknown,
    SendMessageVariables,
    SendMessageMutationContext
  >({
    mutationKey: SEND_MESSAGE_MUTATION_KEY(chatId),
    mutationFn: async ({
      chatId: targetChatId,
      content,
      clientMessageId,
      createdAt,
    }) => {
      await messageOutboxRuntime.enqueue({
        chatId: targetChatId,
        content,
        clientMessageId,
        createdAt,
      });
    },
    onMutate: async (variables) => {
      const targetKey = CHAT_MESSAGES_QUERY_KEY(variables.chatId);
      await queryClient.cancelQueries({ queryKey: targetKey });

      const optimisticMessage = createOptimisticMessage(variables);

      queryClient.setQueryData<InfiniteData<ChatMessagesResponse>>(
        targetKey,
        (current) => prependMessageToFirstPage(current, optimisticMessage),
      );

      return {
        optimisticMessageId: optimisticMessage.id,
        targetChatId: variables.chatId,
      };
    },
    onError: (error, variables, context) => {
      if (context) {
        queryClient.setQueryData<InfiniteData<ChatMessagesResponse>>(
          CHAT_MESSAGES_QUERY_KEY(context.targetChatId),
          (current) => removeMessageById(current, context.optimisticMessageId),
        );
      } else if (variables.chatId) {
        queryClient.invalidateQueries({
          queryKey: CHAT_MESSAGES_QUERY_KEY(variables.chatId),
        });
      }

      const fallbackMessage =
        error instanceof Error ? error.message : "Failed to queue message";
      const message = resolveApiErrorMessage(fallbackMessage);
      toast.error(message);
    },
  });
};
