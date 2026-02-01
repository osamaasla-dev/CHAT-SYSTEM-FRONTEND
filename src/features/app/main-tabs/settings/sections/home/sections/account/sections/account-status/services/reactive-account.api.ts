import { apiPatch } from "@/shared/lib/api";

export const reactiveAccountApi = async () =>
  await apiPatch<void>("/account/reactive");
