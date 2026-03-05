import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { resolveApiErrorMessage } from "@/shared/utils";
import type { MuteChatNotificationsPayload } from "../types/chat.types";
import { UpdateChatNotificationsApi } from "../services/chat.api";

export const UPDATE_CHAT_NOTIFICATIONS_MUTATION_KEY = (chatId: string) =>
  ["chats", "notifications", chatId] as const;

export function useUpdateChatNotifications(chatId: string) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, MuteChatNotificationsPayload>({
    mutationKey: UPDATE_CHAT_NOTIFICATIONS_MUTATION_KEY(chatId),
    mutationFn: (payload) => UpdateChatNotificationsApi(chatId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["chats", "private"] });
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(error.message);
      toast.error(message);
    },
  });
}
