import type { ChatListFilter } from "@/features/chats";
import { SearchInput } from "@/features/search";
import { ChatsFilterPills } from "./ChatsFilterPills";

type ChatsTabHeaderProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filter: ChatListFilter;
  onFilterChange: (filter: ChatListFilter) => void;
};

const FILTER_OPTIONS: { value: ChatListFilter; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "UNREAD", label: "Unread" },
];

export const ChatsTabHeader = ({
  searchValue,
  onSearchChange,
  filter,
  onFilterChange,
}: ChatsTabHeaderProps) => {
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-xl font-semibold text-primary-dark">Chats</h1>
        <p className="text-sm text-muted-foreground">
          Start or continue your conversations.
        </p>
      </div>

      <SearchInput
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search chats by name or username"
      />

      <ChatsFilterPills
        options={FILTER_OPTIONS}
        activeFilter={filter}
        onChange={onFilterChange}
      />
    </div>
  );
};

