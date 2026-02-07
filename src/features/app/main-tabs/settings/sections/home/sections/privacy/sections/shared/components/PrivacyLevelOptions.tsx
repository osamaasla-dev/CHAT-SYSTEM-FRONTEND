import type { PrivacyLevel, PrivacySettings } from "../../../types";
import { usePrivacySettings, useUpdatePrivacySettings } from "../../../hooks";

export type PrivacyLevelField = keyof Pick<
  PrivacySettings,
  "avatarVisibility" | "allowDirectMessages" | "usernameSearch"
>;

export type PrivacyOption = {
  value: PrivacyLevel;
  label: string;
  description: string;
};

type PrivacyLevelOptionsProps = {
  field: PrivacyLevelField;
  description?: string;
  options: PrivacyOption[];
};

export function PrivacyLevelOptions({
  field,
  description,
  options,
}: PrivacyLevelOptionsProps) {
  const { data: settings } = usePrivacySettings();
  const { mutate: updatePrivacySettings } = useUpdatePrivacySettings();

  const selectedValue = settings?.[field];

  const handleChange = (value: PrivacyLevel) => {
    if (!value || value === selectedValue) return;
    updatePrivacySettings({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        {description && (
          <p className="text font-semibold text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-start gap-3 rounded-2xl p-4 transition hover:bg-secondary "
          >
            <input
              type="radio"
              name={`${field}-privacy-level`}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => handleChange(option.value)}
              className="mt-1 size-4 cursor-pointer accent-primary"
            />
            <div>
              <p className="font-medium text-primary">{option.label}</p>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
