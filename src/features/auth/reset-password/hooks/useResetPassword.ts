import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import type { ResetPasswordPayload } from "../schemas";
import { resetPasswordApi } from "../services";
import { resetPasswordMessages } from "../messages";
import { useNavigate } from "react-router-dom";
import { resolveApiErrorMessage } from "@/shared/utils";

export const RESET_PASSWORD_MUTATION_KEY = ["auth", "reset-password"] as const;

export function useResetPassword() {
  const navigate = useNavigate();
  return useMutation<
    ApiSuccessResponse<void>,
    ApiErrorResponse,
    ResetPasswordPayload
  >({
    mutationKey: RESET_PASSWORD_MUTATION_KEY,
    mutationFn: resetPasswordApi,
    onMutate: () => {
      toast.dismiss();
      toast.loading(resetPasswordMessages.LOADING);
    },
    onSuccess: () => {
      toast.dismiss();
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(
        error.message,
        resetPasswordMessages,
      );
      toast.dismiss();
      toast.error(message || resetPasswordMessages.FAILURE);
    },
  });
}
