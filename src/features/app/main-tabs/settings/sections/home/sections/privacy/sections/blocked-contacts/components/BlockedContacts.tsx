import { resolveApiErrorMessage } from "@/shared/utils";
import {
  Button,
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/shared/components";

import { useBlockedContactsList } from "../hooks/ui/useBlockedContactsList";
import { BlockedContactList } from "./BlockedContactList";

export const BlockedContacts = () => {
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
  } = useBlockedContactsList(10);

  if (isLoading && !isRefetching) {
    return (
      <LoadingState
        className="min-h-[200px] rounded-xl border border-secondary/40 bg-white"
        label="Fetching your blocked contacts…"
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
  if (!items.length)
    return (
      <EmptyState
        message="You haven’t blocked anyone yet"
        className="rounded-xl border border-dashed border-secondary/40 bg-white p-6 text-center"
      />
    );
  return (
    <BlockedContactList
      contacts={items}
      sentinelRef={sentinelRef}
      hasNextPage={Boolean(hasNextPage)}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};
