import type { RefObject } from "react";

import { BlockedContactCard } from "./BlockedContactCard";
import type { BlockedContactItem } from "@/features/blocks";

type BlockedContactListProps = {
  contacts: BlockedContactItem[];
  sentinelRef: RefObject<HTMLDivElement | null>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export const BlockedContactList = ({
  contacts,
  sentinelRef,
  hasNextPage,
  isFetchingNextPage,
}: BlockedContactListProps) => (
  <section>
    {contacts.map((contact) => (
      <BlockedContactCard key={contact.blockId} contact={contact} />
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
