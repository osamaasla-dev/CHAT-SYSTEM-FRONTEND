import {
  AccountStatusSummaryCard,
  CancelDeletionAction,
  DeactivateAccountAction,
  DeleteAccountAction,
  ReactivateAccountAction,
} from "./";
import { useAccountStatusActions, useAccountStatusInfo } from "../hooks";

export const AccountStatusSettings = () => {
  const {
    toneClassName,
    statusLabel,
    deletionDateLabel,
    isActive,
    isInactive,
    isBanned,
    isScheduledForDeletion,
  } = useAccountStatusInfo();

  const {
    deactivateAccount,
    deleteAccount,
    reactiveAccount,
    cancelDeleteAccount,
    isCancelingDeletion,
    isDeactivating,
    isDeleting,
    isReactivating,
  } = useAccountStatusActions();

  return (
    <div className="space-y-8">
      <AccountStatusSummaryCard
        statusLabel={statusLabel}
        toneClassName={toneClassName}
        isScheduledForDeletion={isScheduledForDeletion}
        deletionDateLabel={deletionDateLabel}
      />

      <section className="flex flex-col gap-8">
        <DeactivateAccountAction
          isActive={isActive}
          isBanned={isBanned}
          isDeactivating={isDeactivating}
          onDeactivate={async () => {
            await deactivateAccount();
          }}
        />

        <ReactivateAccountAction
          isInactive={isInactive}
          isReactivating={isReactivating}
          isDeleting={isDeleting}
          isScheduledForDeletion={isScheduledForDeletion}
          onReactivate={() => {
            void reactiveAccount();
          }}
        />

        <DeleteAccountAction
          isBanned={isBanned}
          isDeleting={isDeleting}
          isScheduledForDeletion={isScheduledForDeletion}
          deletionDateLabel={deletionDateLabel}
          onDelete={async () => {
            await deleteAccount();
          }}
        />

        <CancelDeletionAction
          isScheduledForDeletion={isScheduledForDeletion}
          isCancelingDeletion={isCancelingDeletion}
          onCancelDeletion={() => {
            void cancelDeleteAccount();
          }}
        />
      </section>
    </div>
  );
};
