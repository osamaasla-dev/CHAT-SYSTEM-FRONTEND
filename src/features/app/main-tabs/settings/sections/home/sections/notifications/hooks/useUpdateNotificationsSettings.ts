import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import { updateNotificationsSettingsApi } from "../services";
import {
  type NotificationsSettings,
  type UpdateNotificationsSettingsInput,
} from "../types/notifications-settings.types";
import { resolveApiErrorMessage } from "@/shared/utils";
import { NOTIFICATIONS_SETTINGS_QUERY_KEY } from "./useNotificationsSettings";

export const UPDATE_NOTIFICATIONS_SETTINGS_MUTATION_KEY = [
  "settings",
  "notifications",
  "update",
] as const;

type UpdateNotificationsContext = {
  previousSettings?: NotificationsSettings;
};

export function useUpdateNotificationsSettings() {
  const queryClient = useQueryClient();
  return useMutation<
    ApiSuccessResponse<void>,
    ApiErrorResponse,
    UpdateNotificationsSettingsInput,
    UpdateNotificationsContext
  >({
    mutationKey: UPDATE_NOTIFICATIONS_SETTINGS_MUTATION_KEY,
    mutationFn: updateNotificationsSettingsApi,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: NOTIFICATIONS_SETTINGS_QUERY_KEY,
      });

      const previousSettings = queryClient.getQueryData<NotificationsSettings>(
        NOTIFICATIONS_SETTINGS_QUERY_KEY,
      );

      if (previousSettings) {
        queryClient.setQueryData<NotificationsSettings>(
          NOTIFICATIONS_SETTINGS_QUERY_KEY,
          {
            ...previousSettings,
            ...payload,
          },
        );
      }

      return { previousSettings };
    },
    onError: (error, _variables, context) => {
      if (context?.previousSettings) {
        queryClient.setQueryData(
          NOTIFICATIONS_SETTINGS_QUERY_KEY,
          context.previousSettings,
        );
      }

      const message = resolveApiErrorMessage(error.message);
      toast.error(message);
    },
  });
}
