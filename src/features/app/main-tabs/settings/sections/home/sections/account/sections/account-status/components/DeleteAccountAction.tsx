import { Trash2 } from "lucide-react";
import { useState } from "react";

import { Button, ConfirmDialog } from "@/shared/components";

import { AccountStatusActionCard } from "./AccountStatusActionCard";

type DeleteAccountActionProps = {
  isBanned: boolean;
  isDeleting: boolean;
  isScheduledForDeletion: boolean;
  deletionDateLabel?: string;
  onDelete: () => Promise<unknown>;
};

export const DeleteAccountAction = ({
  isBanned,
  isDeleting,
  isScheduledForDeletion,
  deletionDateLabel,
  onDelete,
}: DeleteAccountActionProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <AccountStatusActionCard
      icon={
        <div className="rounded-2xl bg-danger/10 p-2 text-danger">
          <Trash2 className="size-5" />
        </div>
      }
      title="Delete account"
      titleClassName="text-danger"
      description="Permanently remove your account data after a cooling-off period."
    >
      {isScheduledForDeletion && deletionDateLabel && (
        <p className="text-sm text-muted-foreground">
          Account is queued for final deletion on {deletionDateLabel}.
        </p>
      )}
      <ConfirmDialog
        title="Delete account"
        description="This action cannot be undone once the grace period ends."
        confirmLabel="Delete"
        confirmVariant="delete"
        isConfirming={isDeleting}
        onConfirm={async () => {
          await onDelete();
        }}
        open={isDialogOpen}
        onOpenChange={setDialogOpen}
        trigger={
          <Button
            type="button"
            variant="delete"
            className="text-sm"
            disabled={isDeleting || isBanned || isScheduledForDeletion}
          >
            {isDeleting ? "Deleting..." : "Delete account"}
          </Button>
        }
      />
    </AccountStatusActionCard>
  );
};
