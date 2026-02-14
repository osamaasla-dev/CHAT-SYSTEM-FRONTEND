import { useMemo, useRef } from "react";

import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import {
  useContacts,
  type ContactsResponse,
  type ContactItem,
} from "@/features/contacts";

const DEFAULT_LIMIT = 5;

type UseContactsListOptions = {
  limit?: number;
  search?: string;
};

export const useContactsList = ({
  limit = DEFAULT_LIMIT,
  search,
}: UseContactsListOptions = {}) => {
  const query = useContacts({ limit, search });
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const items: ContactItem[] = useMemo(
    () =>
      query.data?.pages.flatMap((page: ContactsResponse) => page.items) ?? [],
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
