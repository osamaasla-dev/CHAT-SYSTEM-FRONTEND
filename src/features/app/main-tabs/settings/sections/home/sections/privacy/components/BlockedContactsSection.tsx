import { ArrowRight } from "lucide-react";
import type { SettingsScreenProps } from "@/features/app/main-tabs/settings/types";
import {
  useBlockedContactsCount,
  usePrefetchBlockedContacts,
} from "@/features/blocks";

export const BlockedContactsSection = ({ push }: SettingsScreenProps) => {
  const { data: count } = useBlockedContactsCount();
  const prefetchBlockedContacts = usePrefetchBlockedContacts(10);
  return (
    <section>
      <button
        type="button"
        onClick={() => push("blocked-contacts")}
        onMouseEnter={prefetchBlockedContacts}
        onFocus={prefetchBlockedContacts}
        className="mb-4 border-b border-t border-gray-light cursor-pointer flex flex-col gap-2 w-full items-start rounded-xl bg-white p-4 transition hover:bg-secondary"
      >
        <div className="flex justify-between w-full">
          <span className=" font-semibold text-primary">Blocked Contacts</span>
          <ArrowRight className="size-5 text-primary ml-auto" />
        </div>
        <span className="text-muted-foreground text-sm">{count}</span>
      </button>
    </section>
  );
};
