import type { LucideIcon } from "lucide-react";
export type SettingsRoute =
  | "home"
  | "account"
  | "privacy"
  | "notifications"
  | "profile-avatar"
  | "direct-messages"
  | "username-search"
  | "blocked-contacts"
  | "email"
  | "password"
  | "account-status";

export type SettingsStack = SettingsRoute[];

export type SettingsScreenProps = {
  push: (route: SettingsRoute) => void;
};

export type Section = {
  label: string;
  route: SettingsRoute;
  Icon?: LucideIcon;
  description?: string;
};
