import {
  useCancelDeleteAccount,
  useDeactiveAccount,
  useDeleteAccount,
  useReactiveAccount,
} from "..";

export const useAccountStatusActions = () => {
  const { mutateAsync: deactivateAccount, isPending: isDeactivating } =
    useDeactiveAccount();
  const { mutateAsync: reactiveAccount, isPending: isReactivating } =
    useReactiveAccount();
  const { mutateAsync: deleteAccount, isPending: isDeleting } =
    useDeleteAccount();
  const { mutateAsync: cancelDeleteAccount, isPending: isCancelingDeletion } =
    useCancelDeleteAccount();

  return {
    deactivateAccount,
    isDeactivating,
    reactiveAccount,
    isReactivating,
    deleteAccount,
    isDeleting,
    cancelDeleteAccount,
    isCancelingDeletion,
  };
};
