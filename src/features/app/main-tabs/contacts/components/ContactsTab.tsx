import { Contacts } from "../components/Contacts";
import { useSearchController } from "@/features/search";
import { ContactsTabHeader } from "./ContactsTabHeader";

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
      <ContactsTabHeader searchValue={value} onSearchChange={handleChange} />

      <Contacts search={search} />
    </div>
  );
};
