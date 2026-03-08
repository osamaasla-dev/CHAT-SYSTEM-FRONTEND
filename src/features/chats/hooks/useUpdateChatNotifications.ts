import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { resolveApiErrorMessage } from "@/shared/utils";
import type { MuteChatNotificationsPayload } from "../types/chat.types";
import { UpdateChatNotificationsApi } from "../services/chat.api";
import {
  updateChatMuteStateInChatsListCache,
} from "../utils/chat-list-cache.utils";
import {
  resolveChatMuteState,
  updateChatMuteStateInPrivateChatCache,
} from "../utils/chat-private-cache.utils";

export const UPDATE_CHAT_NOTIFICATIONS_MUTATION_KEY = (chatId: string) =>
  ["chats", "notifications", chatId] as const;

export function useUpdateChatNotifications(chatId: string) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, MuteChatNotificationsPayload>({
    mutationKey: UPDATE_CHAT_NOTIFICATIONS_MUTATION_KEY(chatId),
    mutationFn: (payload) => UpdateChatNotificationsApi(chatId, payload),
    onSuccess: (_data, variables) => {
      const muteState = resolveChatMuteState(variables);

      updateChatMuteStateInPrivateChatCache(queryClient, {
        chatId,
        ...muteState,
      });

      updateChatMuteStateInChatsListCache(queryClient, {
        chatId,
        ...muteState,
      });
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(error.message);
      toast.error(message);
    },
  });
}
