import type { RefObject } from "react";

import type { ContactItem } from "@/features/contacts";
import { ContactCard } from "./ContactCard";
import { ContactListFooter } from "./ContactListFooter";

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
  <section className="overflow-y-auto border-t border-secondary">
    {contacts.map((contact) => (
      <ContactCard key={contact.contactId} contact={contact} />
    ))}

    <div ref={sentinelRef} />
    <ContactListFooter
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  </section>
);

