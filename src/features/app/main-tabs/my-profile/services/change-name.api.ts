import { apiPatch } from "@/shared/lib/api";
import type { ChangeNameSchema } from "../schemas";

export const changeNameApi = async (payload: ChangeNameSchema) =>
  await apiPatch<void>("/profile/name/change", payload);
