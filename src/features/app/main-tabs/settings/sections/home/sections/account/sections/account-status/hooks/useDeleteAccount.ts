import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import { deleteAccountApi } from "../services";
import { accountStatusMessages } from "../messages/account-status.messages";
import { resolveApiErrorMessage } from "@/shared/utils";
import { MY_PROFILE_QUERY_KEY } from "@/features/app/main-tabs/my-profile";
import { useQueryClient } from "@tanstack/react-query";

export const DELETE_ACCOUNT_MUTATION_KEY = ["account", "delete"] as const;

export function useDeleteAccount() {
  const queryClient = useQueryClient();
  return useMutation<ApiSuccessResponse<void>, ApiErrorResponse>({
    mutationKey: DELETE_ACCOUNT_MUTATION_KEY,
    mutationFn: deleteAccountApi,
    onMutate: () => {
      toast.dismiss();
      toast.loading(accountStatusMessages.LOADING);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(accountStatusMessages.DELETE_ACCOUNT_SUCCESS);
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
