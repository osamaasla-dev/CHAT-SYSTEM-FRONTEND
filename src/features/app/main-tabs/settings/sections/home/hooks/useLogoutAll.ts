import { useMutation } from "@tanstack/react-query";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import { logoutAllApi } from "../services";
import { resolveApiErrorMessage } from "@/shared/utils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const LOGOUT_ALL_SETTINGS_MUTATION_KEY = [
  "settings",
  "logout",
  "all",
] as const;

export function useLogoutAll() {
  const navigate = useNavigate();
  return useMutation<ApiSuccessResponse<void>, ApiErrorResponse, void>({
    mutationKey: LOGOUT_ALL_SETTINGS_MUTATION_KEY,
    mutationFn: logoutAllApi,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(error.message);
      toast.error(message);
    },
  });
}
