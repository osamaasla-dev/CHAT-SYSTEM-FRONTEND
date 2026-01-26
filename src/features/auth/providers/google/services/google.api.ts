import { apiPost } from "@/shared/lib/api";
import type { GoogleLoginResponse } from "../types";

export const googleLoginApi = async () =>
  await apiPost<GoogleLoginResponse>("/auth/google/init");
