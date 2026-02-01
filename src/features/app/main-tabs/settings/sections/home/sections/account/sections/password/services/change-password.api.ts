import { apiPatch } from "@/shared/lib/api";
import type { ChangePasswordRequest } from "../schemas/change-password.schama";

export const changePasswordApi = async (payload: ChangePasswordRequest) =>
  await apiPatch<void>("/auth/password/change", payload);
