import { apiPatch } from "@/shared/lib/api";

export const changeAvatarApi = async (payload: FormData) =>
  await apiPatch<void>("/profile/avatar/change", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
