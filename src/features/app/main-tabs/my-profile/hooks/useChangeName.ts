import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import type { ChangeNameSchema } from "../schemas";
import { changeNameApi } from "../services";
import { myProfileMessages } from "../messages";
import { resolveApiErrorMessage } from "@/shared/utils";
import { MY_PROFILE_QUERY_KEY } from "./useMyProfile";

export const CHANGE_NAME_MUTATION_KEY = ["profile", "change-name"] as const;

export function useChangeName() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiSuccessResponse<void>,
    ApiErrorResponse,
    ChangeNameSchema
  >({
    mutationKey: CHANGE_NAME_MUTATION_KEY,
    mutationFn: changeNameApi,
    onMutate: () => {
      toast.dismiss();
      toast.loading(myProfileMessages.CHANGE_NAME.LOADING);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(myProfileMessages.CHANGE_NAME.SUCCESS);
      queryClient.invalidateQueries({ queryKey: MY_PROFILE_QUERY_KEY });
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(
        error.message,
        myProfileMessages.GENERAL,
      );
      toast.dismiss();
      toast.error(message || myProfileMessages.GENERAL.FAILED);
    },
  });
}
