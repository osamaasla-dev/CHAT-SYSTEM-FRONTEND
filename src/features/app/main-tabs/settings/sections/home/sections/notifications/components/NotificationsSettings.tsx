import { Switch } from "@/shared/components";
import {
  useNotificationsSettings,
  useUpdateNotificationsSettings,
} from "../hooks";
import type { NotificationSettingField } from "../types/notifications-settings.types";
import { notificationToggles } from "../constants/sections";

export const NotificationsSettings = () => {
  const { data: settings } = useNotificationsSettings();
  const { mutate: updateNotifications } = useUpdateNotificationsSettings();

  const handleToggle = (field: NotificationSettingField, current: boolean) => {
    updateNotifications({ [field]: !current });
  };

  return (
    <section className="space-y-4">
      <div>
        <p className="text font-semibold text-muted-foreground">
          Choose what to be notified about inside the app.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {notificationToggles.map(({ field, label, description }) => {
          const currentValue = settings?.[field];
          const isChecked = Boolean(currentValue);

          const onChange = () => {
            if (typeof currentValue === "boolean") {
              handleToggle(field, currentValue);
            }
          };

          return (
            <div
              key={field}
              className="flex items-center justify-between gap-6 px-4 py-3"
            >
              <div>
                <p className="font-medium text-primary">{label}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
              <Switch checked={isChecked} onCheckedChange={onChange} />
            </div>
          );
        })}
      </div>
    </section>
  );
};
