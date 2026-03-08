import type { MessageTick } from "@/features/messages";

export type UserPresenceStatus = "online" | "offline";

export type UserState = {
  userId: string;
  status: UserPresenceStatus;
  lastSeen?: string; // ISO string
};

export type PrivateChatResponse = {
  id: string;
  createdAt: string;
  notificationsMuted: boolean;
  muteUntil: string | null;
  otherUser: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string | null;
    status: string | null;
    isBlockedByMe: boolean;
    isBlockedByOther: boolean;
  };
};

export type MuteChatNotificationsPayload = {
  mute: boolean;
  muteUntil?: string | null;
  muteForever?: boolean;
};

export type ChatListFilter = "ALL" | "UNREAD";

export type ChatListLastMessage = {
  id: string;
  senderId: string;
  content: string | null;
  contentType: "TEXT" | "IMAGE";
  createdAt: string;
  isDeleted: boolean;
  ticks: MessageTick;
};

export type ChatListItem = {
  id: string;
  createdAt: string;
  notificationsMuted: boolean;
  muteUntil: string | null;
  unreadCount: number;
  lastMessage: ChatListLastMessage | null;
  otherUser: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string | null;
    status: string | null;
    isBlockedByMe: boolean;
    isBlockedByOther: boolean;
  };
};

export type ChatsListResponse = {
  items: ChatListItem[];
  meta: {
    limit: number;
    nextCursor: string | null;
  };
};
