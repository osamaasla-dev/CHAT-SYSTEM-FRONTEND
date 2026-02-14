import { apiGet } from "@/shared/lib";
import type { UserState } from "../types/chat.types";

export const userStatusApi = async (userId: string) => {
  if (!userId) {
    throw new Error("Cannot fetch user status without userId");
  }
  const response = await apiGet<UserState | null>(`/presence/${userId}`);
  return response.data;
};
