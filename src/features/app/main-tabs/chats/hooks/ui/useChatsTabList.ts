import { useMemo, useRef } from "react";

import {
  useChatsList,
  type ChatListFilter,
  type ChatListItem,
  type ChatsListResponse,
} from "@/features/chats";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";

const DEFAULT_LIMIT = 20;

type UseChatsTabListParams = {
  search?: string;
  filter: ChatListFilter;
  limit?: number;
};

export const useChatsTabList = ({
  search,
  filter,
  limit = DEFAULT_LIMIT,
}: UseChatsTabListParams) => {
  const query = useChatsList({
    limit,
    search,
    filter,
  });
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const items: ChatListItem[] = useMemo(
    () => query.data?.pages.flatMap((page: ChatsListResponse) => page.items) ?? [],
    [query.data],
  );

  useInfiniteScroll({
    sentinelRef,
    hasNextPage: Boolean(query.hasNextPage),
    isFetching: query.isFetchingNextPage,
    onLoadMore: () => {
      void query.fetchNextPage();
    },
    enabled: Boolean(query.hasNextPage),
  });

  return {
    ...query,
    items,
    sentinelRef,
  };
};

