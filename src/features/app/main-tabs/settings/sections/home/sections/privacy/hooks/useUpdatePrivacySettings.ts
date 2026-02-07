import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import { updatePrivacySettingsApi } from "../services/update-privacy-settings.api";
import type { PrivacySettings, UpdatePrivacySettingsInput } from "../types";
import { resolveApiErrorMessage } from "@/shared/utils";
import { PRIVACY_SETTINGS_QUERY_KEY } from "./usePrivacySettings";

export const UPDATE_PRIVACY_SETTINGS_MUTATION_KEY = [
  "settings",
  "privacy",
  "update",
] as const;

type UpdatePrivacyContext = {
  previousSettings?: PrivacySettings;
};

export function useUpdatePrivacySettings() {
  const queryClient = useQueryClient();
  return useMutation<
    ApiSuccessResponse<void>,
    ApiErrorResponse,
    UpdatePrivacySettingsInput,
    UpdatePrivacyContext
  >({
    mutationKey: UPDATE_PRIVACY_SETTINGS_MUTATION_KEY,
    mutationFn: updatePrivacySettingsApi,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: PRIVACY_SETTINGS_QUERY_KEY });

      const previousSettings = queryClient.getQueryData<PrivacySettings>(
        PRIVACY_SETTINGS_QUERY_KEY,
      );

      if (previousSettings) {
        queryClient.setQueryData<PrivacySettings>(PRIVACY_SETTINGS_QUERY_KEY, {
          ...previousSettings,
          ...payload,
        });
      }

      return { previousSettings };
    },
    onError: (error, _variables, context) => {
      if (context?.previousSettings) {
        queryClient.setQueryData(
          PRIVACY_SETTINGS_QUERY_KEY,
          context.previousSettings,
        );
      }

      const message = resolveApiErrorMessage(error.message);
      toast.error(message);
    },
  });
}
