import { useState } from "react";

import type { ChatListFilter } from "@/features/chats";
import { useSearchController } from "@/features/search";
import {
  Button,
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/shared/components";
import { resolveApiErrorMessage } from "@/shared/utils";
import { useChatsTabList } from "../hooks/ui/useChatsTabList";
import { ChatsList } from "./ChatsList";
import { ChatsTabHeader } from "./ChatsTabHeader";

export const ChatsTab = () => {
  const [filter, setFilter] = useState<ChatListFilter>("ALL");
  const { value, debouncedValue, isActive, handleChange } = useSearchController({
    delay: 500,
    minLength: 1,
  });

  const search = isActive ? debouncedValue : undefined;
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
  } = useChatsTabList({
    search,
    filter,
  });

  if (isLoading && !isRefetching) {
    return (
      <LoadingState
        className="min-h-[220px] rounded-xl border border-secondary/40 bg-white"
        label="Loading your chats..."
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

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
      <ChatsTabHeader
        searchValue={value}
        onSearchChange={handleChange}
        filter={filter}
        onFilterChange={setFilter}
      />

      {items.length === 0 ? (
        <EmptyState
          message={
            filter === "UNREAD"
              ? "No unread chats."
              : "No chats found. Start a new conversation."
          }
          className="rounded-xl border border-dashed border-secondary/40 bg-white p-6 text-center"
        />
      ) : (
        <ChatsList
          items={items}
          sentinelRef={sentinelRef}
          hasNextPage={Boolean(hasNextPage)}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
};
