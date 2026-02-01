import { UserCog } from "lucide-react";
import type { Section } from "../../../constants";

export const homeSections: Section[] = [
  {
    label: "Account",
    route: "account",
    Icon: UserCog,
    description: "change email, password, account status, delete account",
  },
];
