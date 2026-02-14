import { Contacts } from "../components/Contacts";
import { SearchInput, useSearchController } from "@/features/search";

export const ContactsTab = () => {
  const { value, debouncedValue, isActive, handleChange } = useSearchController(
    {
      delay: 500,
      minLength: 1,
    },
  );

  const search = isActive ? debouncedValue : undefined;

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
      <div className="space-y-3">
        <div>
          <h1 className="text-xl font-semibold text-primary-dark">Contacts</h1>
          <p className="text-sm text-muted-foreground">
            Manage your contacts list.
          </p>
        </div>

        <SearchInput
          value={value}
          onChange={handleChange}
          placeholder="Search by name or username"
        />
      </div>

      <Contacts search={search} />
    </div>
  );
};
