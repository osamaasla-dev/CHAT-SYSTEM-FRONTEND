import { Contacts } from "../components/Contacts";

export const ContactsTab = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
      <div>
        <h1 className="text-xl font-semibold text-primary-dark">Contacts</h1>
        <p className="text-sm text-muted-foreground">
          Manage your contacts list.
        </p>
      </div>

      <Contacts />
    </div>
  );
};
