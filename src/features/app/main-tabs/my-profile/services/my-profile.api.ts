import { apiGet } from "@/shared/lib/api";
import type { MyProfileInfo } from "../types";

export const MyProfileApi = async () => {
  const response = await apiGet<MyProfileInfo>("/profile/me");

  return response.data;
};
