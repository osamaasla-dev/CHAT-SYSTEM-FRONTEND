import { useMemo, useRef } from "react";

import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { useBlockedContacts } from "@/features/blocks";

const DEFAULT_LIMIT = 10;

export const useBlockedContactsList = (limit: number = DEFAULT_LIMIT) => {
  const query = useBlockedContacts({ limit });
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const items = useMemo(
    () => query.data?.pages.flatMap((page) => page.items) ?? [],
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
