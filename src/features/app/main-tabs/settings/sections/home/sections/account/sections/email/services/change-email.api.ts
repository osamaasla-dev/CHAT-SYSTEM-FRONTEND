import { apiPatch } from "@/shared/lib/api";
import type { ChangeEmailSchema } from "../schemas/change-email.schama";

export const changeEmailApi = async (payload: ChangeEmailSchema) =>
  await apiPatch<void>("/auth/email/change", payload);
