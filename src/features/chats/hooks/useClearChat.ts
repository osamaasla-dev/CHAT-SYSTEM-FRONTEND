import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { resolveApiErrorMessage } from "@/shared/utils";
import { clearChatApi } from "../services/chat.api";
import { clearChatInChatsListCache } from "../utils/chat-list-cache.utils";
import { clearChatMessagesCache } from "../utils/chat-messages-cache.utils";

export const CLEAR_CHAT_MUTATION_KEY = (chatId: string) =>
  ["chats", "clear", chatId] as const;

export function useClearChat(chatId: string) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, void>({
    mutationKey: CLEAR_CHAT_MUTATION_KEY(chatId),
    mutationFn: () => clearChatApi(chatId),
    onSuccess: () => {
      clearChatMessagesCache(queryClient, chatId);
      clearChatInChatsListCache(queryClient, chatId);
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(error.message);
      toast.error(message);
    },
  });
}
