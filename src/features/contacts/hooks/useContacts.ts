import { useInfiniteQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { contactsApi } from "../services/contacts.api";
import type { ContactsQuerySchema } from "../schemas/contacts.schema";
import type { ContactsResponse } from "../types/contacts.types";

const DEFAULT_LIMIT = 20;
const FIVE_MINUTES = 5 * 60 * 1000;

export const CONTACTS_QUERY_KEY = ["contacts", "list"] as const;

export const contactsQueryOptions = (limit: number) => ({
  queryKey: CONTACTS_QUERY_KEY,
  queryFn: ({ pageParam }: { pageParam?: unknown }) =>
    contactsApi({
      limit,
      cursor: typeof pageParam === "string" ? pageParam : undefined,
    }),
  initialPageParam: undefined,
  getNextPageParam: (lastPage: ContactsResponse) =>
    lastPage.meta.nextCursor ?? undefined,
  staleTime: FIVE_MINUTES,
});

type UseContactsOptions = {
  enabled?: boolean;
  limit?: ContactsQuerySchema["limit"];
};

export const useContacts = ({
  enabled = true,
  limit = DEFAULT_LIMIT,
}: UseContactsOptions = {}) => {
  return useInfiniteQuery<ContactsResponse, ApiErrorResponse>({
    ...contactsQueryOptions(limit),
    enabled,
  });
};
