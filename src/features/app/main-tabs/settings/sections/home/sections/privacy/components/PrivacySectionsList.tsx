import type { SettingsScreenProps } from "@/features/app/main-tabs/settings/types";
import type { PrivacySettings } from "../types";
import { PrivacySettingsSections } from "../constants/sections";
import { ArrowRight } from "lucide-react";

type PrivacySectionsListProps = Pick<SettingsScreenProps, "push"> & {
  settings?: PrivacySettings;
};

export const PrivacySectionsList = ({ push, settings }: PrivacySectionsListProps) => {
  return (
    <section>
      <p className="mb-4 font-semibold text-muted-foreground">
        Who can see my personal information
      </p>
      {PrivacySettingsSections.map((section) => (
        <button
          key={section.label}
          type="button"
          onClick={() => push(section.route)}
          className="border-b border-gray-light cursor-pointer flex flex-col gap-2 w-full items-start rounded-xl bg-white p-4 transition hover:bg-secondary"
        >
          <div className="flex justify-between w-full">
            <span className=" font-semibold text-primary">{section.label}</span>
            <ArrowRight className="size-5 text-primary ml-auto" />
          </div>
          <span className="text-muted-foreground text-xs">
            {settings?.[section.value]}
          </span>
        </button>
      ))}
    </section>
  );
};
