import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { NOTIFICATIONS_UNREAD_COUNT_QUERY_KEY } from "../constants/notification-query-keys";
import { getNotificationsUnreadCountApi } from "../services/notification.api";
import type { NotificationsUnreadCountResponse } from "../types/notification.types";

type UseNotificationsUnreadCountParams = {
  enabled?: boolean;
};

export const useNotificationsUnreadCount = ({
  enabled = true,
}: UseNotificationsUnreadCountParams = {}) => {
  return useQuery<NotificationsUnreadCountResponse, ApiErrorResponse>({
    queryKey: NOTIFICATIONS_UNREAD_COUNT_QUERY_KEY,
    queryFn: getNotificationsUnreadCountApi,
    enabled,
    retry: (failureCount, error) => {
      if (error.statusCode === 429) {
        return false;
      }

      return failureCount < 2;
    },
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    staleTime: 60_000,
  });
};
