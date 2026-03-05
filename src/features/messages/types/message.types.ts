export type MessageTick = {
  visibleTicks: 1 | 2;
  isBlue: boolean;
};

export type MessageLocalState = "PENDING";

export type MessageReactionItem = {
  emoji: string;
  count: number;
  reactedByMe: boolean;
};

export type MessageReactionDetailsItem = {
  reactionId: string;
  userId: string;
  name: string;
  avatarUrl: string | null;
  emoji: string;
  createdAt: string;
  isMe: boolean;
};

export type MessageReactionTabItem = {
  emoji: string;
  count: number;
};

export type ChatMessageItem = {
  id: string;
  chatId: string;
  senderId: string;
  clientMessageId: string | null;
  clientCreatedAt?: string;
  content: string | null;
  contentType: "TEXT" | "IMAGE";
  reactions: MessageReactionItem[];
  createdAt: string;
  editedAt: string | null;
  isDeleted: boolean;
  isOwn: boolean;
  isUnread: boolean;
  wasUnreadOnLoad?: boolean;
  localState?: MessageLocalState;
  ticks: MessageTick;
};

export type ChatMessagesResponse = {
  items: ChatMessageItem[];
  meta: {
    limit: number;
    nextCursor: string | null;
  };
};

export type CreateMessagePayload = {
  chatId: string;
  content: string;
  clientMessageId: string;
};

export type CreateMessageResponse = {
  message: ChatMessageItem;
};

export type EditMessagePayload = {
  messageId: string;
  content: string;
};

export type EditMessageResponse = {
  messageId: string;
  chatId: string;
  content: string;
  editedAt: string;
};

export type MessageNewEventPayload = {
  chatId: string;
  message: ChatMessageItem;
};

export type MessageReceiptUpdatePayload = {
  chatId: string;
  messageIds: string[];
  ticks: MessageTick;
};

export type MessageDeletedEventPayload = {
  chatId: string;
  messageId: string;
  deletedAt: string;
};

export type MessageEditedEventPayload = {
  chatId: string;
  messageId: string;
  content: string;
  editedAt: string;
};

export type ToggleMessageReactionResponse = {
  messageId: string;
  chatId: string;
  emoji: string;
  action: "ADDED" | "REMOVED";
  reactions: MessageReactionItem[];
};

export type MessageReactionUpdatedEventPayload = {
  chatId: string;
  messageId: string;
  reactions: MessageReactionItem[];
};

export type MessageReactionsDetailsResponse = {
  messageId: string;
  chatId: string;
  filterEmoji: string | null;
  myReaction: MessageReactionDetailsItem | null;
  tabs: {
    totalCount: number;
    items: MessageReactionTabItem[];
  };
  items: MessageReactionDetailsItem[];
  meta: {
    limit: number;
    nextCursor: string | null;
  };
};
