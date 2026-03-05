import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { resolveApiErrorMessage } from "@/shared/utils";
import { CHAT_MESSAGES_QUERY_KEY, type ChatMessagesResponse } from "@/features/messages";
import { clearChatApi } from "../services/chat.api";

export const CLEAR_CHAT_MUTATION_KEY = (chatId: string) =>
  ["chats", "clear", chatId] as const;

export function useClearChat(chatId: string) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, void>({
    mutationKey: CLEAR_CHAT_MUTATION_KEY(chatId),
    mutationFn: () => clearChatApi(chatId),
    onSuccess: () => {
      queryClient.setQueryData<InfiniteData<ChatMessagesResponse>>(
        CHAT_MESSAGES_QUERY_KEY(chatId),
        (current) => {
          const firstPage = current?.pages[0];
          const firstPageParam = current?.pageParams[0];

          return {
            pages: [
              {
                items: [],
                meta: {
                  limit: firstPage?.meta.limit ?? 20,
                  nextCursor: null,
                },
              },
            ],
            pageParams: [firstPageParam],
          };
        },
      );
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(error.message);
      toast.error(message);
    },
  });
}
