import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import type { MfaChallengeResponse } from "../schemas";
import { mfaChallengeApi } from "../services";
import { mfaMessages } from "../messages/mfa.messages";
import { resolveApiErrorMessage } from "@/shared/utils";

export const MFA_CHALLENGE_MUTATION_KEY = ["auth", "mfa-challenge"] as const;

export function useMfaChallenge() {
  return useMutation<
    ApiSuccessResponse<MfaChallengeResponse>,
    ApiErrorResponse,
    void
  >({
    mutationKey: MFA_CHALLENGE_MUTATION_KEY,
    mutationFn: mfaChallengeApi,
    onSuccess: () => {
      toast.dismiss();
      toast.success(mfaMessages.SUCCESS);
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(error.message, mfaMessages);
      toast.dismiss();
      toast.error(message);
    },
  });
}
