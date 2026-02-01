import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import { deleteAvatarApi } from "../services";
import { myProfileMessages } from "../messages";
import { resolveApiErrorMessage } from "@/shared/utils";
import { MY_PROFILE_QUERY_KEY } from "./useMyProfile";

export const DELETE_AVATAR_MUTATION_KEY = ["profile", "delete-avatar"] as const;

export function useDeleteAvatar() {
  const queryClient = useQueryClient();

  return useMutation<ApiSuccessResponse<void>, ApiErrorResponse, void>({
    mutationKey: DELETE_AVATAR_MUTATION_KEY,
    mutationFn: deleteAvatarApi,
    onMutate: () => {
      toast.dismiss();
      toast.loading(myProfileMessages.DELETE_AVATAR.LOADING);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(myProfileMessages.DELETE_AVATAR.SUCCESS);
      queryClient.invalidateQueries({ queryKey: MY_PROFILE_QUERY_KEY });
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(
        error.message,
        myProfileMessages.DELETE_AVATAR,
      );
      toast.dismiss();
      toast.error(message || myProfileMessages.GENERAL.FAILED);
    },
  });
}
