import { Button, ConfirmDialog } from "@/shared/components";
import type { SettingsScreenProps } from "../../../types";
import { homeSections } from "../constants";
import { useLogout, useLogoutAll } from "../hooks";

export const HomeSettings = ({ push }: SettingsScreenProps) => {
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();
  const { mutateAsync: logoutAll, isPending: isLoggingOutAll } = useLogoutAll();

  return (
    <div className="space-y-6">
      <div>
        {homeSections.map((section) => (
          <button
            key={section.label}
            type="button"
            onClick={() => push(section.route)}
            className="border-b border-gray-light cursor-pointer w-full rounded-xl bg-white p-4 transition hover:bg-secondary"
          >
            <div className="flex w-full gap-2">
              {section.Icon && <section.Icon className="size-5 text-primary" />}
              <span className="text text-primary">{section.label}</span>
            </div>
            <p className="text-sm text-left text-muted-foreground">
              {section.description}
            </p>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <ConfirmDialog
          title="Log out"
          description="You'll need to sign in again on this device."
          confirmLabel="Log out"
          isConfirming={isLoggingOut}
          onConfirm={async () => {
            await logout();
          }}
          trigger={
            <Button className="w-full" variant="secondary">
              Log out
            </Button>
          }
        />

        <ConfirmDialog
          title="Log out from all devices"
          description="You'll be signed out everywhere and must log in again."
          confirmLabel="Log out everywhere"
          isConfirming={isLoggingOutAll}
          onConfirm={async () => {
            await logoutAll();
          }}
          trigger={
            <Button className="w-full" variant="delete">
              Log out from all devices
            </Button>
          }
        />
      </div>
    </div>
  );
};
