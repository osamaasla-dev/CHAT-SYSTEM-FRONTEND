export const SOCKET_EVENTS = {
  // generic connection / transport events
  UNAUTHORIZED: "unauthorized",
  FORCED_DISCONNECT: "forced_disconect",
  CONNECT_ERROR: "connect_error",
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  MESSAGE: "message",

  // domain-specific events
  BLOCK_USER: "user:block",
  UNBLOCK_USER: "user:unblock",
  CHAT_PRESENCE_UPDATE: "chat:presence:update",
  CHAT_PRESENCE_SUBSCRIBE: "chat:presence:subscribe",
  CHAT_PRESENCE_UNSUBSCRIBE: "chat:presence:unsubscribe",
  CHAT_JOIN: "chat:join",
  CHAT_LEAVE: "chat:leave",
  CHAT_TYPING: "chat:typing",
  MESSAGE_SEEN: "message:seen",
  MESSAGE_SYNC_DELIVERED: "message:sync-delivered",
  MESSAGE_NEW: "message:new",
  MESSAGE_RECEIPT_UPDATE: "message:receipt:update",
  MESSAGE_DELETED: "message:deleted",
  MESSAGE_EDITED: "message:edited",
  MESSAGE_REACTION_UPDATED: "message:reaction:updated",
  NOTIFICATION_NEW: "notification:new",
  NOTIFICATION_UNREAD_COUNT: "notification:unread-count",
} as const;
