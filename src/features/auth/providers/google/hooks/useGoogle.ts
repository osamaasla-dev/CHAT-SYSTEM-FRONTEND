import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import type { GoogleLoginResponse } from "../types";
import { googleLoginApi } from "../services";
import { googleMessages } from "../messages";
import { resolveApiErrorMessage, toSafeHttpUrl } from "@/shared/utils";

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
        const safeAuthorizationUrl = toSafeHttpUrl(response.data.authorizationUrl);
        if (safeAuthorizationUrl) {
          window.location.assign(safeAuthorizationUrl);
          return;
        }

        toast.error(googleMessages.FAILED);
      },
      onError: (error) => {
        const message = resolveApiErrorMessage(error.message, googleMessages);
        toast.dismiss();
        toast.error(message || googleMessages.FAILED);
      },
    },
  );
}
