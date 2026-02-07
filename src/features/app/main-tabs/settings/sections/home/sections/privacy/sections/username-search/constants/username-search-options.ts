import type { PrivacyOption } from "../../shared/components/PrivacyLevelOptions";

export const USERNAME_SEARCH_OPTIONS: PrivacyOption[] = [
  {
    value: "ALL",
    label: "Everyone",
    description: "Anyone can find you in search results.",
  },
  {
    value: "CONTACTS",
    label: "Contacts",
    description: "Only people who already have you saved can locate you.",
  },
  {
    value: "ONLY_ME",
    label: "Only me",
    description: "Hide your username from search entirely.",
  },
];
