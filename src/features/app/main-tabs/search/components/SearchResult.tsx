import type { UseQueryResult } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { resolveApiErrorMessage } from "@/shared/utils";
import { useChatStore } from "@/features/app/stores/chat.store";
import type { SearchUserResult } from "../types/search-user.types";
import { SearchResultCard } from "./SearchResultCard";

type SearchResultProps = {
  searchQuery: UseQueryResult<SearchUserResult, ApiErrorResponse>;
};

export const SearchResult = ({ searchQuery }: SearchResultProps) => {
  const openChat = useChatStore((state) => state.openChat);

  if (searchQuery.isLoading) {
    return <p className="text-sm text-muted-foreground">Searching...</p>;
  }

  if (searchQuery.isError) {
    return (
      <div className="rounded-lg border border-danger/40 bg-danger/5 px-4 py-3 text-sm text-danger">
        {resolveApiErrorMessage(searchQuery.error.message)}
      </div>
    );
  }

  if (!searchQuery.isSuccess || !searchQuery.data) {
    return null;
  }

  const { user, isInMyContacts, isBlockedByMe } = searchQuery.data;

  return (
    <SearchResultCard
      user={user}
      isInMyContacts={isInMyContacts}
      isBlockedByMe={isBlockedByMe}
      onOpenChat={() => {
        openChat(user.id);
      }}
    />
  );
};

