import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import type { GoogleLoginResponse } from "../types";
import { googleLoginApi } from "../services";
import { googleMessages } from "../messages";
import { resolveApiErrorMessage } from "@/shared/utils";

export const GOOGLE_LOGIN_MUTATION_KEY = ["auth", "google-login"] as const;

export function useGoogleLogin() {
  return useMutation<ApiSuccessResponse<GoogleLoginResponse>, ApiErrorResponse>(
    {
      mutationKey: GOOGLE_LOGIN_MUTATION_KEY,
      mutationFn: googleLoginApi,
      onMutate: () => {
        toast.dismiss();
        toast.loading("Logging in with Google...");
      },
      onSuccess: (response) => {
        toast.dismiss();
        if (response.data.authorizationUrl) {
          window.location.href = response.data.authorizationUrl;
        }
      },
      onError: (error) => {
        const message = resolveApiErrorMessage(error.message, googleMessages);
        toast.dismiss();
        toast.error(message || googleMessages.FAILED);
      },
    },
  );
}
