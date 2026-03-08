import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { getChatsApi } from "../services/chat.api";
import type { ChatListFilter, ChatsListResponse } from "../types/chat.types";

const DEFAULT_LIMIT = 20;

export const CHATS_LIST_QUERY_KEY = ["chats", "list"] as const;

const normalizeSearch = (search?: string) => {
  const trimmed = search?.trim();
  return trimmed ? trimmed : undefined;
};

const chatsListQueryKey = (params: {
  limit: number;
  search?: string;
  filter: ChatListFilter;
}) =>
  [
    ...CHATS_LIST_QUERY_KEY,
    {
      limit: params.limit,
      search: normalizeSearch(params.search) ?? null,
      filter: params.filter,
    },
  ] as const;

type UseChatsListParams = {
  limit?: number;
  search?: string;
  filter?: ChatListFilter;
  enabled?: boolean;
};

export const useChatsList = ({
  limit = DEFAULT_LIMIT,
  search,
  filter = "ALL",
  enabled = true,
}: UseChatsListParams = {}) => {
  const normalizedSearch = normalizeSearch(search);

  return useInfiniteQuery<ChatsListResponse, ApiErrorResponse>({
    queryKey: chatsListQueryKey({ limit, search: normalizedSearch, filter }),
    queryFn: ({ pageParam }) =>
      getChatsApi({
        limit,
        cursor: typeof pageParam === "string" ? pageParam : undefined,
        search: normalizedSearch,
        filter,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.meta.nextCursor ?? undefined,
    placeholderData: keepPreviousData,
    refetchOnReconnect: true,
    enabled,
  });
};
