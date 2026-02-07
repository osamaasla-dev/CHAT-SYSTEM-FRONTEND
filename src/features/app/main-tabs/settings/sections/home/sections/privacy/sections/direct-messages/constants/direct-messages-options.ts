import type { PrivacyOption } from "../../shared/components/PrivacyLevelOptions";

export const DIRECT_MESSAGES_OPTIONS: PrivacyOption[] = [
  {
    value: "ALL",
    label: "Everyone",
    description: "Anyone can send you a message request.",
  },
  {
    value: "CONTACTS",
    label: "Contacts",
    description: "Only people in your contacts list can message you directly.",
  },
  {
    value: "ONLY_ME",
    label: "Only me",
    description: "Block all new direct message attempts.",
  },
];
