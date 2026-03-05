import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { resolveApiErrorMessage } from "@/shared/utils";
import { deleteChatApi } from "../services/chat.api";

export const DELETE_CHAT_MUTATION_KEY = (chatId: string) =>
  ["chats", "delete", chatId] as const;

export function useDeleteChat(chatId: string) {
  return useMutation<void, ApiErrorResponse, void>({
    mutationKey: DELETE_CHAT_MUTATION_KEY(chatId),
    mutationFn: () => deleteChatApi(chatId),
    onError: (error) => {
      const message = resolveApiErrorMessage(error.message);
      toast.error(message);
    },
  });
}
