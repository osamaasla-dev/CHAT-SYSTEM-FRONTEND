import type { SettingsScreenProps } from "@/features/app/main-tabs/settings/types";
import { acountSections } from "../constants/sections";
import { ArrowRight } from "lucide-react";

export const AccountSettings = ({ push }: SettingsScreenProps) => {
  return (
    <div>
      {acountSections.map((section) => (
        <button
          key={section.label}
          type="button"
          onClick={() => push(section.route)}
          className="cursor-pointer flex gap-2 w-full items-center rounded-xl bg-white p-4 transition hover:bg-secondary"
        >
          <section.Icon className="size-5 text-primary" />
          <span className="text-primary">{section.label}</span>
          <ArrowRight className="size-5 text-primary ml-auto" />
        </button>
      ))}
    </div>
  );
};
