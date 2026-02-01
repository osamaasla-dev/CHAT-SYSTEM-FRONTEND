import type { LucideIcon } from "lucide-react";
import type { SettingsRoute } from "../types";

export type Section = {
  label: string;
  route: SettingsRoute;
  Icon: LucideIcon;
  description?: string;
};
