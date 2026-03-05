import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { resolveApiErrorMessage } from "@/shared/utils";
import { deleteMessageApi } from "../services/message.api";
import type { ChatMessagesResponse } from "../types/message.types";
import { markMessageAsDeletedInCache } from "../utils/delete-message-cache.utils";
import { CHAT_MESSAGES_QUERY_KEY } from "./useChatMessages";

export const DELETE_MESSAGE_MUTATION_KEY = (chatId: string) =>
  ["messages", "delete", chatId] as const;

export const useDeleteMessage = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    { messageId: string; chatId: string; deletedAt: string },
    Error,
    { messageId: string }
  >({
    mutationKey: DELETE_MESSAGE_MUTATION_KEY(chatId),
    mutationFn: async ({ messageId }) => deleteMessageApi(messageId),
    onSuccess: (result) => {
      queryClient.setQueryData<InfiniteData<ChatMessagesResponse>>(
        CHAT_MESSAGES_QUERY_KEY(result.chatId),
        (current) => markMessageAsDeletedInCache(current, result.messageId),
      );
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(error.message);
      toast.error(message);
    },
  });
};
