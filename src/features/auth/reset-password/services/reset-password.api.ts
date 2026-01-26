import { apiPost } from "@/shared/lib/api";
import type { ResetPasswordPayload } from "../schemas";
export const resetPasswordApi = async (payload: ResetPasswordPayload) =>
  await apiPost<void>("/auth/password/reset", payload);
