import { apiPatch } from "@/shared/lib/api";

export const cancelDeleteAccountApi = async () =>
  await apiPatch<void>("/account/delete/cancel");
