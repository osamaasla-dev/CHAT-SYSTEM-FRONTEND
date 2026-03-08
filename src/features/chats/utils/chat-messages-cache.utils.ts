import type { InfiniteData, QueryClient } from "@tanstack/react-query";

import {
  CHAT_MESSAGES_QUERY_KEY,
  type ChatMessagesResponse,
} from "@/features/messages";

const DEFAULT_MESSAGES_LIMIT = 20;

export const clearChatMessagesCache = (
  queryClient: QueryClient,
  chatId: string,
) => {
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
              limit: firstPage?.meta.limit ?? DEFAULT_MESSAGES_LIMIT,
              nextCursor: null,
            },
          },
        ],
        pageParams: [firstPageParam],
      };
    },
  );
};
