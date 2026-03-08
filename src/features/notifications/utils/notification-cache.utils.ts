import type { QueryClient } from "@tanstack/react-query";

import { NOTIFICATIONS_UNREAD_COUNT_QUERY_KEY } from "../constants/notification-query-keys";
import type { NotificationsUnreadCountResponse } from "../types/notification.types";

export const setNotificationsUnreadCountCache = (
  queryClient: QueryClient,
  unreadCount: number,
) => {
  queryClient.setQueryData<NotificationsUnreadCountResponse>(
    NOTIFICATIONS_UNREAD_COUNT_QUERY_KEY,
    { unreadCount: Math.max(0, unreadCount) },
  );
};
