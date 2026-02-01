import { RefreshCw } from "lucide-react";

import { Button } from "@/shared/components";

import { AccountStatusActionCard } from "./AccountStatusActionCard";

type ReactivateAccountActionProps = {
  isInactive: boolean;
  isReactivating: boolean;
  isDeleting: boolean;
  isScheduledForDeletion: boolean;
  onReactivate: () => void;
};

export const ReactivateAccountAction = ({
  isInactive,
  isReactivating,
  isDeleting,
  isScheduledForDeletion,
  onReactivate,
}: ReactivateAccountActionProps) => {
  return (
    <AccountStatusActionCard
      icon={
        <div className="rounded-2xl bg-emerald-50 p-2 text-success">
          <RefreshCw className="size-5" />
        </div>
      }
      title="Reactivate account"
      description="Bring your profile back online and resume normal usage."
    >
      <Button
        type="button"
        variant="submit"
        className="w-fit text-sm"
        disabled={
          !isInactive || isReactivating || isDeleting || isScheduledForDeletion
        }
        onClick={onReactivate}
      >
        {isReactivating ? "Reactivating..." : "Reactivate"}
      </Button>
    </AccountStatusActionCard>
  );
};
