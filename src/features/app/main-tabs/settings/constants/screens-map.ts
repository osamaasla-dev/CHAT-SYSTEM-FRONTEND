import {
  AccountSettings,
  EmailSettings,
  PasswordSettings,
  HomeSettings,
  AccountStatusSettings,
  PrivacySettings,
  ProfileAvatar,
  DirectMessages,
  UsernameSearch,
  BlockedContacts,
  NotificationsSettings,
} from "../sections";
import type { SettingsRoute, SettingsScreenProps } from "../types";
import type { ReactElement } from "react";

type SettingsScreenComponent = (props: SettingsScreenProps) => ReactElement;

export const screensMap: Record<SettingsRoute, SettingsScreenComponent> = {
  home: HomeSettings,
  account: AccountSettings,
  privacy: PrivacySettings,
  notifications: NotificationsSettings,
  "profile-avatar": ProfileAvatar,
  "direct-messages": DirectMessages,
  "username-search": UsernameSearch,
  "blocked-contacts": BlockedContacts,
  email: EmailSettings,
  password: PasswordSettings,
  "account-status": AccountStatusSettings,
};
