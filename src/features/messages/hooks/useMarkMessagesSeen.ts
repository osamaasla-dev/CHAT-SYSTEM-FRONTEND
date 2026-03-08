import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

import { markChatAsReadInChatsListCache } from "@/features/chats/utils/chat-list-cache.utils";
import { messageEmitters } from "@/features/websocket";
import { markChatMessagesSeenApi } from "../services/message.api";
import type { ChatMessagesResponse } from "../types/message.types";
import { CHAT_MESSAGES_QUERY_KEY } from "./useChatMessages";

export const MARK_MESSAGES_SEEN_MUTATION_KEY = (chatId: string) =>
  ["messages", "seen", chatId] as const;

export const useMarkMessagesSeen = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    { updatedCount: number; messageIds: string[] },
    Error,
    void
  >({
    mutationKey: MARK_MESSAGES_SEEN_MUTATION_KEY(chatId),
    mutationFn: async () => {
      try {
        const ack = await messageEmitters.markSeen(chatId);
        return ack.data;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "SOCKET_NOT_CONNECTED";

        if (
          errorMessage !== "SOCKET_NOT_CONNECTED" &&
          errorMessage !== "SOCKET_ACK_TIMEOUT"
        ) {
          throw error;
        }

        return markChatMessagesSeenApi(chatId);
      }
    },
    onSuccess: (result) => {
      if (result.messageIds.length > 0) {
        const seenMessageIds = new Set(result.messageIds);

        queryClient.setQueryData<InfiniteData<ChatMessagesResponse>>(
          CHAT_MESSAGES_QUERY_KEY(chatId),
          (current) => {
            if (!current || current.pages.length === 0) {
              return current;
            }

            return {
              ...current,
              pages: current.pages.map((page) => ({
                ...page,
                items: page.items.map((item) =>
                  seenMessageIds.has(item.id)
                    ? {
                        ...item,
                        isUnread: false,
                      }
                    : item,
                ),
              })),
            };
          },
        );
      }

      markChatAsReadInChatsListCache(queryClient, chatId);
    },
  });
};
