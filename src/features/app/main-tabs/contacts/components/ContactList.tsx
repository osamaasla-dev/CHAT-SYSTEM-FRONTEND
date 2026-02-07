import type { RefObject } from "react";

import type { ContactItem } from "@/features/contacts";
import { ContactCard } from "./ContactCard";

type ContactListProps = {
  contacts: ContactItem[];
  sentinelRef: RefObject<HTMLDivElement | null>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export const ContactList = ({
  contacts,
  sentinelRef,
  hasNextPage,
  isFetchingNextPage,
}: ContactListProps) => (
  <section className="overflow-y-auto mt-4 border-t border-secondary">
    {contacts.map((contact) => (
      <ContactCard key={contact.contactId} contact={contact} />
    ))}

    <div ref={sentinelRef} />
    {hasNextPage ? (
      <p className="text-center text-xs text-muted-foreground">
        {isFetchingNextPage ? "Loading more…" : "Scroll to load more"}
      </p>
    ) : (
      <p className="text-center text-xs text-muted-foreground">
        You’ve reached the end of the list.
      </p>
    )}
  </section>
);
