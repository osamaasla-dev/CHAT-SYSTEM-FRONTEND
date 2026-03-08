import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { resolveApiErrorMessage } from "@/shared/utils";
import { deleteChatApi } from "../services/chat.api";
import { removeChatFromChatsListCache } from "../utils/chat-list-cache.utils";

export const DELETE_CHAT_MUTATION_KEY = (chatId: string) =>
  ["chats", "delete", chatId] as const;

export function useDeleteChat(chatId: string) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, void>({
    mutationKey: DELETE_CHAT_MUTATION_KEY(chatId),
    mutationFn: () => deleteChatApi(chatId),
    onSuccess: () => {
      removeChatFromChatsListCache(queryClient, chatId);
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(error.message);
      toast.error(message);
    },
  });
}
