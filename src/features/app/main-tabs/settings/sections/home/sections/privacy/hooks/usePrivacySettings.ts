import { useQuery } from "@tanstack/react-query";
import { privacySettingsApi } from "../services";

export const PRIVACY_SETTINGS_QUERY_KEY = ["settings", "privacy"] as const;

export const usePrivacySettings = () => {
  const query = useQuery({
    queryKey: PRIVACY_SETTINGS_QUERY_KEY,
    queryFn: privacySettingsApi,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnReconnect: true,
  });

  return query;
};
