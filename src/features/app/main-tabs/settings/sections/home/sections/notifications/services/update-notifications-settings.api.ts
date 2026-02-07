import { apiPatch } from "@/shared/lib";
import type { UpdateNotificationsSettingsInput } from "../types/notifications-settings.types";

export const updateNotificationsSettingsApi = async (
  payload: UpdateNotificationsSettingsInput,
) => {
  return apiPatch<void>("/settings/notifications", payload);
};
