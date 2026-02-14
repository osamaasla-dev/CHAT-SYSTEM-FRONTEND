import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { contactsApi } from "../services/contacts.api";
import type { ContactsQuerySchema } from "../schemas/contacts.schema";
import type { ContactsResponse } from "../types/contacts.types";

const DEFAULT_LIMIT = 20;

export const CONTACTS_QUERY_KEY = ["contacts", "list"] as const;

const contactsQueryKey = (search?: string) =>
  search ? ([...CONTACTS_QUERY_KEY, { search }] as const) : CONTACTS_QUERY_KEY;

export const contactsQueryOptions = (limit: number, search?: string) => ({
  // include search in the key so changing it triggers a new query,
  // while keeping CONTACTS_QUERY_KEY as a stable prefix for invalidations
  queryKey: contactsQueryKey(search),
  queryFn: ({ pageParam }: { pageParam?: unknown }) =>
    contactsApi({
      limit,
      cursor: typeof pageParam === "string" ? pageParam : undefined,
      search,
    }),
  initialPageParam: undefined,
  getNextPageParam: (lastPage: ContactsResponse) =>
    lastPage.meta.nextCursor ?? undefined,
  refetchOnReconnect: true,
  placeholderData: keepPreviousData,
});

type UseContactsOptions = {
  enabled?: boolean;
  limit?: ContactsQuerySchema["limit"];
  search?: ContactsQuerySchema["search"];
};

export const useContacts = ({
  enabled = true,
  limit = DEFAULT_LIMIT,
  search,
}: UseContactsOptions = {}) => {
  return useInfiniteQuery<ContactsResponse, ApiErrorResponse>({
    ...contactsQueryOptions(limit, search),
    enabled,
  });
};
