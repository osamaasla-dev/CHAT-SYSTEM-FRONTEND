import { apiPost } from "@/shared/lib/api";
import type { TokenIntrospectionResponse } from "../types/token.types";

export const tokenIntrospectApi = async () =>
  await apiPost<TokenIntrospectionResponse>("/auth/token/introspect");
