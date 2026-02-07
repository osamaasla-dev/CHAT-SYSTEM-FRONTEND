import type { PrivacyLevel } from "../../../types";

type PrivacyOption = {
  value: PrivacyLevel;
  label: string;
  description: string;
};

export const AVATAR_OPTIONS: PrivacyOption[] = [
  {
    value: "ALL",
    label: "Everyone",
    description: "Your avatar is visible to all users.",
  },
  {
    value: "CONTACTS",
    label: "Contacts",
    description: "Only people saved in your contacts can view your avatar.",
  },
  {
    value: "ONLY_ME",
    label: "Only me",
    description: "Hide your avatar from everyone else.",
  },
];
