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
  "onlineVisibility" | "lastSeenVisibility" | "readReceiptsVisibility"
>;

export const visibilityToggles: Array<{
  field: BooleanSettingField;
  label: string;
  description: string;
}> = [
  {
    field: "onlineVisibility",
    label: "Show online status",
    description:
      "When disabled, you also lose access to everyone else's online state.",
  },
  {
    field: "lastSeenVisibility",
    label: "Show last seen",
    description:
      "When disabled, your last seen is hidden and you can't view others' last seen.",
  },
  {
    field: "readReceiptsVisibility",
    label: "Send read receipts",
    description:
      "When disabled, neither you nor others will see read receipts.",
  },
];
