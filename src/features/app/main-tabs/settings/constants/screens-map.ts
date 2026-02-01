import {
  AccountSettings,
  EmailSettings,
  PasswordSettings,
  HomeSettings,
  AccountStatusSettings,
} from "../sections";
import type { SettingsRoute, SettingsScreenProps } from "../types";
import type { ReactElement } from "react";

type SettingsScreenComponent = (props: SettingsScreenProps) => ReactElement;

export const screensMap: Record<SettingsRoute, SettingsScreenComponent> = {
  home: HomeSettings,
  account: AccountSettings,
  email: EmailSettings,
  password: PasswordSettings,
  "account-status": AccountStatusSettings,
};
