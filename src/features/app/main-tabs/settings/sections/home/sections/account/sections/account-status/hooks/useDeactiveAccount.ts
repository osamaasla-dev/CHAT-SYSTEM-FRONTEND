import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import { deactiveAccountApi } from "../services";
import { accountStatusMessages } from "../messages/account-status.messages";
import { resolveApiErrorMessage } from "@/shared/utils";
import { MY_PROFILE_QUERY_KEY } from "@/features/app/main-tabs/my-profile";
import { useQueryClient } from "@tanstack/react-query";

export const DEACTIVE_ACCOUNT_MUTATION_KEY = ["account", "deactive"] as const;

export function useDeactiveAccount() {
  const queryClient = useQueryClient();
  return useMutation<ApiSuccessResponse<void>, ApiErrorResponse>({
    mutationKey: DEACTIVE_ACCOUNT_MUTATION_KEY,
    mutationFn: deactiveAccountApi,
    onMutate: () => {
      toast.dismiss();
      toast.loading(accountStatusMessages.LOADING);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(accountStatusMessages.DEACTIVE_SUCCESS);
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
