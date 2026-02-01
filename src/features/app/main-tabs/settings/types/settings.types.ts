export type SettingsRoute =
  | "home"
  | "account"
  | "email"
  | "password"
  | "account-status";

export type SettingsStack = SettingsRoute[];

export type SettingsScreenProps = {
  push: (route: SettingsRoute) => void;
  pop: () => void;
  stack: SettingsStack;
};
