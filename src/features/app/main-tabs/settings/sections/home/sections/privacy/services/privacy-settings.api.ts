import { apiGet } from "@/shared/lib";
import type { PrivacySettings } from "../types";

export const privacySettingsApi = async () => {
  const response = await apiGet<PrivacySettings>("/settings/privacy");
  return response.data;
};
