import { Power } from "lucide-react";
import { useState } from "react";

import { Button, ConfirmDialog } from "@/shared/components";

import { AccountStatusActionCard } from "./AccountStatusActionCard";

type DeactivateAccountActionProps = {
  isActive: boolean;
  isBanned: boolean;
  isDeactivating: boolean;
  onDeactivate: () => Promise<unknown>;
};

export const DeactivateAccountAction = ({
  isActive,
  isBanned,
  isDeactivating,
  onDeactivate,
}: DeactivateAccountActionProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <AccountStatusActionCard
      icon={
        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
          <Power className="size-5" />
        </div>
      }
      title="Deactivate account"
      description="Temporarily hide your account from search and prevent new sessions."
    >
      <ConfirmDialog
        title="Deactivate account"
        description="You can reactivate any time by signing back in."
        confirmLabel="Deactivate"
        confirmVariant="delete"
        isConfirming={isDeactivating}
        onConfirm={async () => {
          await onDeactivate();
        }}
        open={isDialogOpen}
        onOpenChange={setDialogOpen}
        trigger={
          <Button
            type="button"
            variant="secondary"
            className="text-sm"
            disabled={!isActive || isDeactivating || isBanned}
          >
            {isDeactivating ? "Processing..." : "Deactivate"}
          </Button>
        }
      />
    </AccountStatusActionCard>
  );
};
