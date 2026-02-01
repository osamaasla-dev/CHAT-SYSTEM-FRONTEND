import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import type { ChangeEmailSchema } from "../schemas/change-email.schama";
import { changeEmailApi } from "../services/change-email.api";
import { changeEmailMessages } from "../messages/change-email.messages";
import { resolveApiErrorMessage } from "@/shared/utils";

export const CHANGE_EMAIL_MUTATION_KEY = ["auth", "change-email"] as const;

export function useChangeEmail() {
  return useMutation<
    ApiSuccessResponse<void>,
    ApiErrorResponse,
    ChangeEmailSchema
  >({
    mutationKey: CHANGE_EMAIL_MUTATION_KEY,
    mutationFn: changeEmailApi,
    onMutate: () => {
      toast.dismiss();
      toast.loading(changeEmailMessages.LOADING);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(changeEmailMessages.SUCCESS);
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(
        error.message,
        changeEmailMessages,
      );
      toast.dismiss();
      toast.error(message || changeEmailMessages.FAILED);
    },
  });
}
