import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { resolveApiErrorMessage } from "@/shared/utils";
import type { ModeratedUploadResult } from "../types/media.types";
import { mediaApi } from "../services/media.api";

export const MEDIA_UPLOAD_MUTATION_KEY = ["media", "upload"] as const;

export function useMediaUpload() {
  return useMutation<ModeratedUploadResult, ApiErrorResponse, FormData>({
    mutationKey: MEDIA_UPLOAD_MUTATION_KEY,
    mutationFn: (file) => mediaApi(file),
    onError: (error) => {
      const message = resolveApiErrorMessage(error.message);
      toast.error(message);
    },
  });
}
