import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import { reactiveAccountApi } from "../services";
import { accountStatusMessages } from "../messages/account-status.messages";
import { resolveApiErrorMessage } from "@/shared/utils";
import { MY_PROFILE_QUERY_KEY } from "@/features/app/main-tabs/my-profile";

export const REACTIVE_ACCOUNT_MUTATION_KEY = ["account", "reactive"] as const;

export function useReactiveAccount() {
  const queryClient = useQueryClient();
  return useMutation<ApiSuccessResponse<void>, ApiErrorResponse>({
    mutationKey: REACTIVE_ACCOUNT_MUTATION_KEY,
    mutationFn: reactiveAccountApi,
    onMutate: () => {
      toast.dismiss();
      toast.loading(accountStatusMessages.LOADING);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(accountStatusMessages.REACTIVE_SUCCESS);
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
