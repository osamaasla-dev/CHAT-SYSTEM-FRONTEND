import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { SignupPayload } from "../schemas";
import type { ApiSuccessResponse, ApiErrorResponse } from "@/shared/lib/api";
import { signupApi } from "../services";
import { signupMessages } from "../messages";
import { resolveApiErrorMessage } from "@/shared/utils";

export const SIGNUP_MUTATION_KEY = ["auth", "signup"] as const;

export function useSignup() {
  return useMutation<
    ApiSuccessResponse<SignupPayload>,
    ApiErrorResponse,
    SignupPayload
  >({
    mutationKey: SIGNUP_MUTATION_KEY,
    mutationFn: signupApi,
    onMutate: () => {
      toast.dismiss();
      toast.loading(signupMessages.LOADING);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(signupMessages.SUCCESS);
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(error.message, signupMessages);
      toast.dismiss();
      toast.error(message || signupMessages.FAILURE);
    },
  });
}
