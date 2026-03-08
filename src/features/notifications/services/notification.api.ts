import { apiGet } from "@/shared/lib";
import type { NotificationsUnreadCountResponse } from "../types/notification.types";

export const getNotificationsUnreadCountApi = async () => {
  const response = await apiGet<NotificationsUnreadCountResponse>(
    "/notifications/unread-count",
  );
  return response.data;
};
