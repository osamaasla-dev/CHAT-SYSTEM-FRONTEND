import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import type { ChangePasswordRequest } from "../schemas/change-password.schama";
import { changePasswordApi } from "../services/change-password.api";
import { changePasswordMessages } from "../messages/change-password.messages";
import { resolveApiErrorMessage } from "@/shared/utils";

export const CHANGE_PASSWORD_MUTATION_KEY = [
  "auth",
  "change-password",
] as const;

export function useChangePassword() {
  return useMutation<
    ApiSuccessResponse<void>,
    ApiErrorResponse,
    ChangePasswordRequest
  >({
    mutationKey: CHANGE_PASSWORD_MUTATION_KEY,
    mutationFn: changePasswordApi,
    onMutate: () => {
      toast.dismiss();
      toast.loading(changePasswordMessages.LOADING);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(changePasswordMessages.SUCCESS);
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(
        error.message,
        changePasswordMessages,
      );
      toast.dismiss();
      toast.error(message || changePasswordMessages.FAILED);
    },
  });
}
