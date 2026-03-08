import { format, isToday, isYesterday, parseISO } from "date-fns";

import type { ChatListItem } from "@/features/chats";

const parseDate = (rawDate: string): Date | null => {
  const parsedDate = parseISO(rawDate);
  if (!Number.isNaN(parsedDate.getTime())) {
    return parsedDate;
  }

  const fallbackDate = new Date(rawDate);
  return Number.isNaN(fallbackDate.getTime()) ? null : fallbackDate;
};

export const formatChatLastMessageTime = (rawDate: string | null): string => {
  if (!rawDate) {
    return "";
  }

  const parsedDate = parseDate(rawDate);
  if (!parsedDate) {
    return "";
  }

  if (isToday(parsedDate)) {
    return format(parsedDate, "h:mm a");
  }

  if (isYesterday(parsedDate)) {
    return "Yesterday";
  }

  return format(parsedDate, "d/M/yyyy");
};

export const getChatLastMessagePreview = (
  chatItem: ChatListItem,
): {
  text: string;
  isOwnLastMessage: boolean;
} => {
  const lastMessage = chatItem.lastMessage;

  if (!lastMessage) {
    return {
      text: "No messages yet",
      isOwnLastMessage: false,
    };
  }

  if (lastMessage.isDeleted) {
    return {
      text: "This message was deleted",
      isOwnLastMessage: lastMessage.senderId !== chatItem.otherUser.id,
    };
  }

  if (lastMessage.contentType === "IMAGE") {
    return {
      text: "Photo",
      isOwnLastMessage: lastMessage.senderId !== chatItem.otherUser.id,
    };
  }

  return {
    text: lastMessage.content ?? "",
    isOwnLastMessage: lastMessage.senderId !== chatItem.otherUser.id,
  };
};

