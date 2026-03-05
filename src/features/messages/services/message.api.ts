import { apiDelete, apiGet, apiPatch, apiPost } from "@/shared/lib";

import type {
  ChatMessagesResponse,
  CreateMessagePayload,
  CreateMessageResponse,
  EditMessageResponse,
  MessageReactionsDetailsResponse,
  ToggleMessageReactionResponse,
} from "../types/message.types";

export const getChatMessagesApi = async (params: {
  chatId: string;
  limit?: number;
  cursor?: string;
}) => {
  const { chatId, limit, cursor } = params;

  if (!chatId) {
    throw new Error("Cannot fetch messages without chatId");
  }

  const searchParams = new URLSearchParams();
  if (limit) {
    searchParams.set("limit", String(limit));
  }
  if (cursor) {
    searchParams.set("cursor", cursor);
  }

  const query = searchParams.toString();
  const endpoint = query ? `/messages/${chatId}?${query}` : `/messages/${chatId}`;

  const response = await apiGet<ChatMessagesResponse>(endpoint);
  return response.data;
};

export const createMessageApi = async (payload: CreateMessagePayload) => {
  const response = await apiPost<CreateMessageResponse>("/messages", payload);
  return response.data;
};

export const editMessageApi = async (params: {
  messageId: string;
  content: string;
}) => {
  const { messageId, content } = params;

  if (!messageId) {
    throw new Error("Cannot edit message without messageId");
  }

  const response = await apiPatch<EditMessageResponse>(`/messages/${messageId}`, {
    content,
  });

  return response.data;
};

export const deleteMessageApi = async (messageId: string) => {
  if (!messageId) {
    throw new Error("Cannot delete message without messageId");
  }

  const response = await apiDelete<{
    messageId: string;
    chatId: string;
    deletedAt: string;
  }>(`/messages/${messageId}`);

  return response.data;
};

export const markChatMessagesSeenApi = async (chatId: string) => {
  if (!chatId) {
    throw new Error("Cannot mark messages seen without chatId");
  }

  const response = await apiPost<{ updatedCount: number; messageIds: string[] }>(
    `/messages/${chatId}/seen`,
  );

  return response.data;
};

export const toggleMessageReactionApi = async (params: {
  messageId: string;
  emoji: string;
}) => {
  const { messageId, emoji } = params;

  if (!messageId) {
    throw new Error("Cannot toggle reaction without messageId");
  }

  if (!emoji.trim()) {
    throw new Error("Cannot toggle reaction without emoji");
  }

  const response = await apiPost<ToggleMessageReactionResponse>(
    `/messages/${messageId}/reactions`,
    { emoji: emoji.trim() },
  );

  return response.data;
};

export const getMessageReactionsApi = async (params: {
  messageId: string;
  limit?: number;
  cursor?: string;
  emoji?: string;
}) => {
  const { messageId, limit, cursor, emoji } = params;

  if (!messageId) {
    throw new Error("Cannot fetch message reactions without messageId");
  }

  const searchParams = new URLSearchParams();
  if (limit) {
    searchParams.set("limit", String(limit));
  }
  if (cursor) {
    searchParams.set("cursor", cursor);
  }
  if (emoji?.trim()) {
    searchParams.set("emoji", emoji.trim());
  }

  const query = searchParams.toString();
  const endpoint = query
    ? `/messages/${messageId}/reactions?${query}`
    : `/messages/${messageId}/reactions`;

  const response = await apiGet<MessageReactionsDetailsResponse>(endpoint);
  return response.data;
};
