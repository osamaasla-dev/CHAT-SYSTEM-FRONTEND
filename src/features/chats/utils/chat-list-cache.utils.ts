import type { InfiniteData, QueryClient } from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";

import { CHATS_LIST_QUERY_KEY } from "../hooks/useChatsList";
import type { ChatListFilter, ChatsListResponse } from "../types/chat.types";

type ChatsListQueryMeta = {
  limit: number;
  search: string | null;
  filter: ChatListFilter;
};

const isChatsListQueryMeta = (value: unknown): value is ChatsListQueryMeta => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<ChatsListQueryMeta>;
  return (
    typeof candidate.limit === "number" &&
    (candidate.search === null || typeof candidate.search === "string") &&
    (candidate.filter === "ALL" || candidate.filter === "UNREAD")
  );
};

const getChatsListFilterFromQueryKey = (
  queryKey: QueryKey,
): ChatListFilter | null => {
  if (!Array.isArray(queryKey) || queryKey.length < 3) {
    return null;
  }

  const meta = queryKey[2];
  if (!isChatsListQueryMeta(meta)) {
    return null;
  }

  return meta.filter;
};

const updateChatsListCache = (
  queryClient: QueryClient,
  updater: (params: {
    filter: ChatListFilter | null;
    current: InfiniteData<ChatsListResponse> | undefined;
  }) => InfiniteData<ChatsListResponse> | undefined,
) => {
  const queryEntries = queryClient.getQueriesData<InfiniteData<ChatsListResponse>>({
    queryKey: CHATS_LIST_QUERY_KEY,
  });

  for (const [queryKey, current] of queryEntries) {
    queryClient.setQueryData<InfiniteData<ChatsListResponse>>(
      queryKey,
      updater({
        filter: getChatsListFilterFromQueryKey(queryKey),
        current,
      }),
    );
  }
};

const mapChatsListPages = (
  current: InfiniteData<ChatsListResponse> | undefined,
  mapItems: (
    items: ChatsListResponse["items"],
    filter: ChatListFilter | null,
  ) => ChatsListResponse["items"],
  filter: ChatListFilter | null,
): InfiniteData<ChatsListResponse> | undefined => {
  if (!current) {
    return current;
  }

  return {
    ...current,
    pages: current.pages.map((page) => ({
      ...page,
      items: mapItems(page.items, filter),
    })),
  };
};

export const clearChatInChatsListCache = (
  queryClient: QueryClient,
  chatId: string,
) => {
  updateChatsListCache(queryClient, ({ current, filter }) => {
    return mapChatsListPages(
      current,
      (items, currentFilter) => {
        if (currentFilter === "UNREAD") {
          return items.filter((item) => item.id !== chatId);
        }

        return items.map((item) =>
          item.id === chatId
            ? {
                ...item,
                unreadCount: 0,
                lastMessage: null,
              }
            : item,
        );
      },
      filter,
    );
  });
};

export const removeChatFromChatsListCache = (
  queryClient: QueryClient,
  chatId: string,
) => {
  updateChatsListCache(queryClient, ({ current, filter }) => {
    return mapChatsListPages(
      current,
      (items) => items.filter((item) => item.id !== chatId),
      filter,
    );
  });
};

export const updateChatMuteStateInChatsListCache = (
  queryClient: QueryClient,
  params: {
    chatId: string;
    notificationsMuted: boolean;
    muteUntil: string | null;
  },
) => {
  updateChatsListCache(queryClient, ({ current, filter }) => {
    return mapChatsListPages(
      current,
      (items) =>
        items.map((item) =>
          item.id === params.chatId
            ? {
                ...item,
                notificationsMuted: params.notificationsMuted,
                muteUntil: params.muteUntil,
              }
            : item,
        ),
      filter,
    );
  });
};

export const markChatAsReadInChatsListCache = (
  queryClient: QueryClient,
  chatId: string,
) => {
  updateChatsListCache(queryClient, ({ current, filter }) => {
    return mapChatsListPages(
      current,
      (items, currentFilter) => {
        if (currentFilter === "UNREAD") {
          return items.filter((item) => item.id !== chatId);
        }

        return items.map((item) =>
          item.id === chatId
            ? {
                ...item,
                unreadCount: 0,
              }
            : item,
        );
      },
      filter,
    );
  });
};
