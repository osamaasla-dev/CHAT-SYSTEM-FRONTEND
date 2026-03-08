import type { QueryClient } from "@tanstack/react-query";

import type {
  MuteChatNotificationsPayload,
  PrivateChatResponse,
} from "../types/chat.types";

export type ChatMuteState = {
  notificationsMuted: boolean;
  muteUntil: string | null;
};

export const resolveChatMuteState = (
  payload: MuteChatNotificationsPayload,
): ChatMuteState => ({
  notificationsMuted: payload.mute,
  muteUntil: payload.mute ? (payload.muteUntil ?? null) : null,
});

export const updateChatMuteStateInPrivateChatCache = (
  queryClient: QueryClient,
  params: {
    chatId: string;
  } & ChatMuteState,
) => {
  queryClient.setQueriesData<PrivateChatResponse>(
    {
      queryKey: ["chats", "private"],
    },
    (current) => {
      if (!current || current.id !== params.chatId) {
        return current;
      }

      return {
        ...current,
        notificationsMuted: params.notificationsMuted,
        muteUntil: params.muteUntil,
      };
    },
  );
};
