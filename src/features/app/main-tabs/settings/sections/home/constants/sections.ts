import { Lock, UserCog, Bell } from "lucide-react";
import type { Section } from "../../../types";

export const homeSections: Section[] = [
  {
    label: "Account",
    route: "account",
    Icon: UserCog,
    description: "change email, password, account status, delete account",
  },
  {
    label: "Privacy",
    route: "privacy",
    Icon: Lock,
    description: "privacy settings, Blocked contacts",
  },
  {
    label: "Notifications",
    route: "notifications",
    Icon: Bell,
    description: "notification settings",
  },
];
