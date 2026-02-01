import { Lock, Mail, ShieldAlert } from "lucide-react";
import type { Section } from "@/features/app/main-tabs/settings/constants";

export const acountSections: Section[] = [
  {
    Icon: Mail,
    label: "Email",
    route: "email",
  },
  {
    Icon: Lock,
    label: "Password",
    route: "password",
  },
  {
    Icon: ShieldAlert,
    label: "Account Status",
    route: "account-status",
  },
];
