import { resolveApiErrorMessage } from "@/shared/utils";
import {
  Button,
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/shared/components";

import { useContactsList } from "../hooks/ui/useContactsList";
import { ContactList } from "./ContactList";

type ContactsProps = {
  search?: string;
};

export const Contacts = ({ search }: ContactsProps) => {
  const {
    items,
    sentinelRef,
    isLoading,
    isRefetching,
    isError,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
  } = useContactsList({ search });

  if (isLoading && !isRefetching) {
    return (
      <LoadingState
        className="min-h-[200px] rounded-xl border border-secondary/40 bg-white"
        label="Fetching your contacts..."
        scope="parent"
      />
    );
  }

  if (isError) {
    return (
      <ErrorState
        message={resolveApiErrorMessage(error.message)}
        className="space-y-4 rounded-xl border border-danger/30 bg-danger/5 p-6 text-center"
      >
        <Button variant="secondary" onClick={() => refetch()}>
          Try again
        </Button>
      </ErrorState>
    );
  }

  if (!items.length) {
    return (
      <EmptyState
        message="You don't have any contacts yet."
        className="rounded-xl border border-dashed border-secondary/40 bg-white p-6 text-center"
      />
    );
  }

  return (
    <ContactList
      contacts={items}
      sentinelRef={sentinelRef}
      hasNextPage={Boolean(hasNextPage)}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

