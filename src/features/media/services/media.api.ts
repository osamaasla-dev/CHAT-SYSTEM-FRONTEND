import { apiPost } from "@/shared/lib";
import type { ModeratedUploadResult } from "../types/media.types";

export const mediaApi = async (file: FormData) => {
  if (!file) {
    throw new Error("File is required");
  }
  const response = await apiPost<ModeratedUploadResult>("/media/upload", file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
