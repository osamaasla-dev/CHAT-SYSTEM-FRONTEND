import { useMutation } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import { logoutApi } from "../services";
import { resolveApiErrorMessage } from "@/shared/utils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const LOGOUT_SETTINGS_MUTATION_KEY = ["settings", "logout"] as const;

export function useLogout() {
  const navigate = useNavigate();
  return useMutation<ApiSuccessResponse<void>, ApiErrorResponse, void>({
    mutationKey: LOGOUT_SETTINGS_MUTATION_KEY,
    mutationFn: logoutApi,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(error.message);
      toast.error(message);
    },
  });
}
