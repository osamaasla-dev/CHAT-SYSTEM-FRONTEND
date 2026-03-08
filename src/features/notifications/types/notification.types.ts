export type NotificationType = "MESSAGE" | "MENTION" | "SYSTEM";

export type NotificationData = {
  chatId?: string;
  messageId?: string;
} | null;

export type NotificationItem = {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string | null;
  actorId: string | null;
  chatId: string | null;
  messageId: string | null;
  data: NotificationData;
  readAt: string | null;
  createdAt: string;
};

export type NotificationsUnreadCountResponse = {
  unreadCount: number;
};
