import type { UseQueryResult } from "@tanstack/react-query";
import { BlockButton } from "@/features/blocks";
import { ContactButton } from "@/features/contacts";
import { resolveApiErrorMessage } from "@/shared/utils";
import type { ApiErrorResponse } from "@/shared/lib/api";
import type { SearchUserResult } from "../types/search-user.types";
import { Avatar, UserNameBlock } from "@/features/profile";

type SearchResultProps = {
  searchQuery: UseQueryResult<SearchUserResult, ApiErrorResponse>;
};

export const SearchResult = ({ searchQuery }: SearchResultProps) => {
  if (searchQuery.isLoading) {
    return <p className="text-sm text-muted-foreground">Searching…</p>;
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
    <article className="cursor-pointer rounded-xl p-3 transition hover:bg-secondary">
      <div className="flex flex-col gap-3 ">
        <div className="flex gap-3">
          <Avatar avatarUrl={user.avatarUrl} name={user.name} />

          <UserNameBlock name={user.name} username={user.username} />
        </div>

        <div className=" flex justify-center flex-wrap gap-2">
          <ContactButton contactId={user.id} isInContacts={isInMyContacts} />

          <BlockButton blockedUserId={user.id} isBlocked={isBlockedByMe} />
        </div>
      </div>
    </article>
  );
};
