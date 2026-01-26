import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import type { LoginResponse, LoginSchema } from "../schemas";
import { loginApi } from "../services";
import { loginMessages } from "../messages/login.messages";
import { useNavigate } from "react-router-dom";
import { resolveApiErrorMessage } from "@/shared/utils";

export const LOGIN_MUTATION_KEY = ["auth", "login"] as const;

export function useLogin() {
  const navigate = useNavigate();
  return useMutation<
    ApiSuccessResponse<LoginResponse>,
    ApiErrorResponse,
    LoginSchema
  >({
    mutationKey: LOGIN_MUTATION_KEY,
    mutationFn: loginApi,
    onMutate: () => {
      toast.dismiss();
      toast.loading(loginMessages.LOADING);
    },
    onSuccess: (response) => {
      toast.dismiss();
      if (response.data.mfa_required) {
        navigate("/mfa", { state: { fromLogin: true } });
      }
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(error.message, loginMessages);
      toast.dismiss();
      toast.error(message || loginMessages.FAILURE);
    },
  });
}
