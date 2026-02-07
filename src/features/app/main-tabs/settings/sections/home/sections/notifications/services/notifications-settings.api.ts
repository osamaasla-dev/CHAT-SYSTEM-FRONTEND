import { apiGet } from "@/shared/lib";
import type { NotificationsSettings } from "../types/notifications-settings.types";

export const notificationsSettingsApi = async () => {
  const response = await apiGet<NotificationsSettings>(
    "/settings/notifications",
  );
  return response.data;
};
