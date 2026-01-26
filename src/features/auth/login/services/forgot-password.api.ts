import { apiPost } from "@/shared/lib/api";
import type { LoginSchema } from "../schemas";

export const forgotPasswordApi = async (email: LoginSchema["email"]) =>
  await apiPost<void>("/auth/password/reset/request", { email });
