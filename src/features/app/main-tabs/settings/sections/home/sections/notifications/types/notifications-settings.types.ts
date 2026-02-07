export type NotificationsSettings = {
  id: string;
  userId: string;
  messageNotifications: boolean;
  soundNotifications: boolean;
  notifyOnMentions: boolean;
  updatedAt: Date;
};

export type NotificationSettingField = keyof Pick<
  NotificationsSettings,
  "messageNotifications" | "soundNotifications" | "notifyOnMentions"
>;

export type UpdateNotificationsSettingsInput = Partial<
  Pick<NotificationsSettings, NotificationSettingField>
>;
