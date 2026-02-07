import { useState } from "react";

import { useSearchUser } from "../hooks/useSearchUser";
import { SearchHeader } from "./SearchHeader";
import { SearchUsernameForm } from "./SearchUsernameForm";
import { SearchResult } from "./SearchResult";

export const SearchTab = () => {
  const [submittedUsername, setSubmittedUsername] = useState<string>("");

  const enabled = submittedUsername.trim().length > 0;
  const searchQuery = useSearchUser(submittedUsername, enabled);

  const handleSearch = (username: string) => {
    setSubmittedUsername(username.trim());
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <SearchHeader />

      <SearchUsernameForm
        onSearch={handleSearch}
        isSearching={searchQuery.isFetching}
      />

      <section className="space-y-3">
        <SearchResult searchQuery={searchQuery} />
      </section>
    </div>
  );
};
