import type { QueryClient } from "@tanstack/react-query";

import type { ContactsResponse } from "@/features/contacts";
import { CONTACTS_QUERY_KEY } from "@/features/contacts";

/**
 * Update contacts cache to reflect that a specific contact has been blocked.
 * Sets `blockedAt` for the matching contact across all infinite-query pages.
 */
export const updateBlockedContactInContactsCache = (
  queryClient: QueryClient,
  blockedUserId: string,
) => {
  const previousContacts = queryClient.getQueryData<{
    pageParams: unknown[];
    pages: ContactsResponse[];
  }>(CONTACTS_QUERY_KEY);

  if (!previousContacts) return;

  const nextContactPages = previousContacts.pages.map(
    (page: ContactsResponse) => ({
      ...page,
      items: page.items?.filter(
        (contact) => contact.contactId !== blockedUserId,
      ),
    }),
  );

  queryClient.setQueryData(CONTACTS_QUERY_KEY, {
    ...previousContacts,
    pages: nextContactPages,
  });
};

/**
 * Remove a contact completely from contacts cache (used after deleting a contact).
 */
export const removeContactFromContactsCache = (
  queryClient: QueryClient,
  contactId: string,
) => {
  const previousContacts = queryClient.getQueryData<{
    pageParams: unknown[];
    pages: ContactsResponse[];
  }>(CONTACTS_QUERY_KEY);

  if (!previousContacts) return;

  const nextPages = previousContacts.pages.map((page: ContactsResponse) => ({
    ...page,
    items: page.items?.filter((item) => item.contactId !== contactId),
  }));

  queryClient.setQueryData(CONTACTS_QUERY_KEY, {
    ...previousContacts,
    pages: nextPages,
  });

  return previousContacts;
};
