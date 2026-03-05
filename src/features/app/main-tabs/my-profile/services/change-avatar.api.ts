import { apiPatch } from "@/shared/lib/api";

export const changeAvatarApi = async (avatarMediaId: string) => {
  if (!avatarMediaId) {
    throw new Error("Avatar media id is required");
  }
  return await apiPatch<void>("/profile/avatar/change", { avatarMediaId });
};
