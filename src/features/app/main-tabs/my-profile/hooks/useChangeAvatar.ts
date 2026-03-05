import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import { changeAvatarApi } from "../services";
import { myProfileMessages } from "../messages";
import { resolveApiErrorMessage } from "@/shared/utils";
import { MY_PROFILE_QUERY_KEY } from "./useMyProfile";

export const CHANGE_AVATAR_MUTATION_KEY = ["profile", "change-avatar"] as const;

export function useChangeAvatar() {
  const queryClient = useQueryClient();

  return useMutation<ApiSuccessResponse<void>, ApiErrorResponse, string>({
    mutationKey: CHANGE_AVATAR_MUTATION_KEY,
    mutationFn: changeAvatarApi,
    onMutate: () => {
      toast.dismiss();
      toast.loading(myProfileMessages.CHANGE_AVATAR.LOADING);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(myProfileMessages.CHANGE_AVATAR.SUCCESS);
      queryClient.invalidateQueries({ queryKey: MY_PROFILE_QUERY_KEY });
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(
        error.message,
        myProfileMessages.CHANGE_AVATAR,
      );
      toast.dismiss();
      toast.error(message || myProfileMessages.GENERAL.FAILED);
    },
  });
}
