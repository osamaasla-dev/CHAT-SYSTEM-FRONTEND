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
} as const;
