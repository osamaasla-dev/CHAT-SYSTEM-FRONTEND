import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/shared/lib/api";
import { tokenIntrospectApi } from "../services/token.api";
import type { TokenIntrospectionResponse } from "../types/token.types";
import { clearClientSessionState } from "@/features/auth/session";

export const TOKEN_INTROSPECTION_MUTATION_KEY = [
  "auth",
  "token",
  "introspect",
] as const;

export function useToken() {
  const navigate = useNavigate();
  return useMutation<
    ApiSuccessResponse<TokenIntrospectionResponse>,
    ApiErrorResponse,
    void
  >({
    mutationKey: TOKEN_INTROSPECTION_MUTATION_KEY,
    mutationFn: tokenIntrospectApi,

    onSuccess: (response) => {
      if (response.data.token.active) {
        navigate("/", { replace: true });
      }
    },
    onError: (error) => {
      if (error.statusCode === 401) {
        void clearClientSessionState().finally(() => {
          navigate("/login", { replace: true });
        });
      }
    },
  });
}
