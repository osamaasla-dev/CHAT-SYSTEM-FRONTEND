import { apiPost } from "@/shared/lib/api";
import type { LoginResponse, LoginSchema } from "../schemas";

export const loginApi = async (payload: LoginSchema) =>
  await apiPost<LoginResponse>("/auth/login", payload);
