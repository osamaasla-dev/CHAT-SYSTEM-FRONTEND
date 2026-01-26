import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import type { LoginSchema } from "../schemas";
import { forgotPasswordApi } from "../services";
import { forgotPasswordMessages } from "../messages";
import { useNavigate } from "react-router-dom";
import { resolveApiErrorMessage } from "@/shared/utils";

export const FORGOT_PASSWORD_MUTATION_KEY = [
  "auth",
  "login",
  "forgot-password",
] as const;

export function useForgotPassword() {
  const navigate = useNavigate();
  return useMutation<
    ApiSuccessResponse<void>,
    ApiErrorResponse,
    LoginSchema["email"]
  >({
    mutationKey: FORGOT_PASSWORD_MUTATION_KEY,
    mutationFn: forgotPasswordApi,
    onMutate: () => {
      toast.dismiss();
      toast.loading(forgotPasswordMessages.LOADING);
    },
    onSuccess: () => {
      toast.dismiss();
      navigate("/password/reset/info", { replace: true });
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(
        error.message,
        forgotPasswordMessages,
      );
      toast.dismiss();
      toast.error(message || forgotPasswordMessages.FAILURE);
    },
  });
}
