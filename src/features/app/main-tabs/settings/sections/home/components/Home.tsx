import type { SettingsScreenProps } from "../../../types";
import { homeSections } from "../constants";

export const HomeSettings = ({ push }: SettingsScreenProps) => {
  return (
    <div>
      {homeSections.map((section) => (
        <button
          key={section.label}
          type="button"
          onClick={() => push(section.route)}
          className="cursor-pointer text-left flex w-full flex-col items-center justify-between rounded-xl bg-white p-4 transition hover:bg-secondary"
        >
          <div className="flex w-full items-center gap-2">
            <section.Icon className="size-5 text-primary" />
            <span className="text text-primary">{section.label}</span>
          </div>
          <p className="text-sm text-muted-foreground">{section.description}</p>
        </button>
      ))}
    </div>
  );
};
