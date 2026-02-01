import { apiPatch } from "@/shared/lib/api";

export const deactiveAccountApi = async () =>
  await apiPatch<void>("/account/deactive");
