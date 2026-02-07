import { useQuery } from "@tanstack/react-query";
import { notificationsSettingsApi } from "../services";

export const NOTIFICATIONS_SETTINGS_QUERY_KEY = [
  "settings",
  "notifications",
] as const;

export const useNotificationsSettings = () => {
  const query = useQuery({
    queryKey: NOTIFICATIONS_SETTINGS_QUERY_KEY,
    queryFn: notificationsSettingsApi,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnReconnect: true,
  });

  return query;
};
