import { SearchInput } from "@/features/search";

type ContactsTabHeaderProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export const ContactsTabHeader = ({
  searchValue,
  onSearchChange,
}: ContactsTabHeaderProps) => {
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-xl font-semibold text-primary-dark">Contacts</h1>
        <p className="text-sm text-muted-foreground">
          Manage your contacts list.
        </p>
      </div>

      <SearchInput
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search by name or username"
      />
    </div>
  );
};

