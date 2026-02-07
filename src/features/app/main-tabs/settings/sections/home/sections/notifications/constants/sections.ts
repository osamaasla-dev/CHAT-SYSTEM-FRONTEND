import type { NotificationSettingField } from "../types/notifications-settings.types";

export const notificationToggles: Array<{
  field: NotificationSettingField;
  label: string;
  description: string;
}> = [
  {
    field: "messageNotifications",
    label: "Message alerts",
    description: "Get notified whenever new messages arrive.",
  },
  {
    field: "soundNotifications",
    label: "Sounds",
    description: "Play a tone for each notification.",
  },
  {
    field: "notifyOnMentions",
    label: "Mentions",
    description: "Alert me when someone mentions my username.",
  },
];
