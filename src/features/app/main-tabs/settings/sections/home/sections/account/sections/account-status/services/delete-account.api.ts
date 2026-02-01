import { apiDelete } from "@/shared/lib/api";

export const deleteAccountApi = async () =>
  await apiDelete<void>("/account/delete");
