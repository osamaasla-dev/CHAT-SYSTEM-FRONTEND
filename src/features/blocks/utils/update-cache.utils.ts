import type { QueryClient } from "@tanstack/react-query";
import { BLOCKED_CONTACTS_QUERY_KEY } from "../hooks/useBlockedContacts";
import type {
  BlockedContactsResponse,
  BlockedContactItem,
} from "../types/blocks.types";

export const updateBlockedContactsCacheAfterUnblock = (
  queryClient: QueryClient,
  blockedUserId: string,
) => {
  const previousInfinite = queryClient.getQueryData<{
    pageParams: unknown[];
    pages: BlockedContactsResponse[];
  }>(BLOCKED_CONTACTS_QUERY_KEY);

  if (!previousInfinite) return;

  const nextPages = previousInfinite.pages?.map((page) => ({
    ...page,
    items: page.items?.filter(
      (item: BlockedContactItem) => item.blockedUserId !== blockedUserId,
    ),
  }));

  queryClient.setQueryData(BLOCKED_CONTACTS_QUERY_KEY, {
    ...previousInfinite,
    pages: nextPages,
  });
  return previousInfinite;
};
