import type { PrivacySettings } from "../types";
import {
  visibilityToggles,
  type BooleanSettingField,
} from "../constants/sections";
import { Switch } from "@/shared/components";

type ActivityVisibilitySectionProps = {
  settings?: PrivacySettings;
  onToggle: (field: BooleanSettingField, currentValue: boolean) => void;
};

export const ActivityVisibilitySection = ({
  settings,
  onToggle,
}: ActivityVisibilitySectionProps) => {
  return (
    <section>
      <div className="flex flex-col gap-4">
        {visibilityToggles.map(({ field, label, description }) => {
          const currentValue = settings?.[field];
          const isChecked = Boolean(currentValue);

          const handleChange = () => {
            if (typeof currentValue === "boolean") {
              onToggle(field, currentValue);
            }
          };

          return (
            <div
              key={field}
              className="flex items-center justify-between gap-6 px-4 py-3"
            >
              <div>
                <p className="font-medium text-primary">{label}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
              <Switch checked={isChecked} onCheckedChange={handleChange} />
            </div>
          );
        })}
      </div>
    </section>
  );
};
