import { Undo2 } from "lucide-react";

import { Button } from "@/shared/components";

import { AccountStatusActionCard } from "./AccountStatusActionCard";

type CancelDeletionActionProps = {
  isScheduledForDeletion: boolean;
  isCancelingDeletion: boolean;
  onCancelDeletion: () => void;
};

export const CancelDeletionAction = ({
  isScheduledForDeletion,
  isCancelingDeletion,
  onCancelDeletion,
}: CancelDeletionActionProps) => {
  return (
    <AccountStatusActionCard
      icon={
        <div className="rounded-2xl bg-secondary p-2 text-primary">
          <Undo2 className="size-5" />
        </div>
      }
      title="Cancel deletion"
      description="Changed your mind? Stop the deletion countdown and keep everything as is."
    >
      <Button
        type="button"
        variant="secondary"
        className="w-fit text-sm "
        disabled={!isScheduledForDeletion || isCancelingDeletion}
        onClick={onCancelDeletion}
      >
        {isCancelingDeletion ? "Cancelling..." : "Cancel delete"}
      </Button>
    </AccountStatusActionCard>
  );
};
