import { useInfiniteQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { blockedContactsApi } from "../services/blocks.api";
import type { BlockedContactsQuerySchema } from "../schemas/blocked-contacts.schema";
import type { BlockedContactsResponse } from "../types/blocks.types";

const DEFAULT_LIMIT = 20;
const FIVE_MINUTES = 5 * 60 * 1000;

export const BLOCKED_CONTACTS_QUERY_KEY = [
  "settings",
  "privacy",
  "blocked-contacts",
] as const;

export const blockedContactsQueryOptions = (limit: number) => ({
  queryKey: BLOCKED_CONTACTS_QUERY_KEY,
  queryFn: ({ pageParam }: { pageParam?: unknown }) =>
    blockedContactsApi({
      limit,
      cursor: typeof pageParam === "string" ? pageParam : undefined,
    }),
  initialPageParam: undefined,
  getNextPageParam: (lastPage: BlockedContactsResponse) =>
    lastPage.meta.nextCursor ?? undefined,
  staleTime: FIVE_MINUTES,
});

type UseBlockedContactsOptions = {
  enabled?: boolean;
  limit?: BlockedContactsQuerySchema["limit"];
};

export const useBlockedContacts = ({
  enabled = true,
  limit = DEFAULT_LIMIT,
}: UseBlockedContactsOptions = {}) => {
  return useInfiniteQuery<BlockedContactsResponse, ApiErrorResponse>({
    ...blockedContactsQueryOptions(limit),
    enabled,
  });
};
