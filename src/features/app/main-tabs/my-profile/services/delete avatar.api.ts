import { apiDelete } from "@/shared/lib/api";

export const deleteAvatarApi = async () =>
  await apiDelete<void>("/profile/avatar/delete");
