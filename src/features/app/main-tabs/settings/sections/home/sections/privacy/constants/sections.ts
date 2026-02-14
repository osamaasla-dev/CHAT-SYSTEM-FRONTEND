import type { Section } from "@/features/app/main-tabs/settings/types";
import type { PrivacySettings } from "../types";

type PrivacySettingField = keyof Pick<
  PrivacySettings,
  "avatarVisibility" | "allowDirectMessages" | "usernameSearch"
>;

type PrivacySettingSection = Section & {
  value: PrivacySettingField;
};

export const PrivacySettingsSections: PrivacySettingSection[] = [
  {
    label: "Profile Avatar",
    route: "profile-avatar",
    value: "avatarVisibility",
  },
  {
    label: "Direct Messages",
    route: "direct-messages",
    value: "allowDirectMessages",
  },
  {
    label: "Username Search",
    route: "username-search",
    value: "usernameSearch",
  },
];

export type BooleanSettingField = keyof Pick<
  PrivacySettings,
  "presenceVisibility" | "readReceiptsVisibility"
>;

export const visibilityToggles: Array<{
  field: BooleanSettingField;
  label: string;
  description: string;
}> = [
  {
    field: "presenceVisibility",
    label: "Show online status and last seen",
    description:
      "Controls whether others can see your online status and last seen. When disabled, you also can't see others' presence.",
  },
  {
    field: "readReceiptsVisibility",
    label: "Send read receipts",
    description:
      "When disabled, neither you nor others will see read receipts.",
  },
];
