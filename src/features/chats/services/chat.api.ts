import { apiDelete, apiGet, apiPatch } from "@/shared/lib";
import type {
  MuteChatNotificationsPayload,
  PrivateChatResponse,
  UserState,
} from "../types/chat.types";

export const userStatusApi = async (userId: string) => {
  if (!userId) {
    throw new Error("Cannot fetch user status without userId");
  }
  const response = await apiGet<UserState | null>(`/presence/${userId}`);
  return response.data;
};

export const getPrivateChatApi = async (otherUserId: string) => {
  if (!otherUserId) {
    throw new Error("Cannot open or get private chat without otherUserId");
  }

  const response = await apiGet<PrivateChatResponse>(
    `/chats/private/${otherUserId}`,
  );

  return response.data;
};

export const clearChatApi = async (chatId: string) => {
  if (!chatId) {
    throw new Error("Cannot clear chat without chatId");
  }

  // POST /chats/:chatId/clear
  await apiPatch<void>(`/chats/${chatId}/clear`);
};

export const deleteChatApi = async (chatId: string) => {
  if (!chatId) {
    throw new Error("Cannot delete chat without chatId");
  }

  // DELETE /chats/:chatId
  await apiDelete<void>(`/chats/${chatId}`);
};

export const UpdateChatNotificationsApi = async (
  chatId: string,
  payload: MuteChatNotificationsPayload,
) => {
  if (!chatId) {
    throw new Error("Cannot mute chat notifications without chatId");
  }

  // PATCH /chats/:chatId/notifications
  await apiPatch<void>(`/chats/${chatId}/notifications`, payload);
};
