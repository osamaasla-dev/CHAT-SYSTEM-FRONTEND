import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import type { MfaCodeSchema, MfaVerifyResponse } from "../schemas";
import { mfaVerifyApi } from "../services";
import { mfaMessages } from "../messages/mfa.messages";
import { resolveApiErrorMessage } from "@/shared/utils";

export const MFA_VERIFY_MUTATION_KEY = ["auth", "mfa-verify"] as const;

export function useMfaVerify() {
  const navigate = useNavigate();

  return useMutation<
    ApiSuccessResponse<MfaVerifyResponse>,
    ApiErrorResponse,
    MfaCodeSchema
  >({
    mutationKey: MFA_VERIFY_MUTATION_KEY,
    mutationFn: mfaVerifyApi,
    onMutate: () => {
      toast.dismiss();
      toast.loading("Verifying code...");
    },
    onSuccess: (response) => {
      toast.dismiss();
      if (response.data.verified) {
        navigate("/");
      }
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(error.message, mfaMessages);
      toast.dismiss();
      toast.error(message);
    },
  });
}
