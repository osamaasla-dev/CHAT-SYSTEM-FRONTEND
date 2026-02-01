import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import { cancelDeleteAccountApi } from "../services";
import { accountStatusMessages } from "../messages/account-status.messages";
import { resolveApiErrorMessage } from "@/shared/utils";
import { MY_PROFILE_QUERY_KEY } from "@/features/app/main-tabs/my-profile";
import { useQueryClient } from "@tanstack/react-query";

export const CANCEL_DELETE_ACCOUNT_MUTATION_KEY = [
  "account",
  "delete",
  "cancel",
] as const;

export function useCancelDeleteAccount() {
  const queryClient = useQueryClient();
  return useMutation<ApiSuccessResponse<void>, ApiErrorResponse>({
    mutationKey: CANCEL_DELETE_ACCOUNT_MUTATION_KEY,
    mutationFn: cancelDeleteAccountApi,
    onMutate: () => {
      toast.dismiss();
      toast.loading(accountStatusMessages.LOADING);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(accountStatusMessages.CANCEL_DELETE_ACCOUNT_SUCCESS);
      queryClient.invalidateQueries({ queryKey: MY_PROFILE_QUERY_KEY });
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(
        error.message,
        accountStatusMessages,
      );
      toast.dismiss();
      toast.error(message);
    },
  });
}
