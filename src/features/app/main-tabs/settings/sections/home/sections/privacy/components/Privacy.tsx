import { useCallback } from "react";
import type { SettingsScreenProps } from "@/features/app/main-tabs/settings/types";
import { usePrivacySettings, useUpdatePrivacySettings } from "../hooks";
import type { BooleanSettingField } from "../constants/sections";
import { PrivacySectionsList } from "./PrivacySectionsList";
import { ActivityVisibilitySection } from "./ActivityVisibilitySection";
import { BlockedContactsSection } from "./BlockedContactsSection";

export const PrivacySettings = ({ push }: SettingsScreenProps) => {
  const { data: settings } = usePrivacySettings();
  const { mutate: updatePrivacySettings } = useUpdatePrivacySettings();

  const handleToggle = useCallback(
    (field: BooleanSettingField, currentValue: boolean) => {
      const nextValue = !currentValue;
      updatePrivacySettings({ [field]: nextValue });
    },
    [updatePrivacySettings],
  );

  return (
    <div className="space-y-8">
      <PrivacySectionsList push={push} settings={settings} />
      <ActivityVisibilitySection settings={settings} onToggle={handleToggle} />
      <BlockedContactsSection push={push} />
    </div>
  );
};
