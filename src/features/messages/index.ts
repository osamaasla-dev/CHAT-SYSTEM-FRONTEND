export { MessageBubble } from "./components/MessageBubble";
export { MessageBubbleActions } from "./components/MessageBubbleActions";
export { MessageBubbleReactions } from "./components/MessageBubbleReactions";
export { MessageDaySeparator } from "./components/MessageDaySeparator";

export {
  CHAT_MESSAGES_QUERY_KEY,
  useChatMessages,
} from "./hooks/useChatMessages";
export { useDeleteMessage } from "./hooks/useDeleteMessage";
export { useEditMessage } from "./hooks/useEditMessage";
export { useMarkMessagesSeen } from "./hooks/useMarkMessagesSeen";
export { useSendMessage } from "./hooks/useSendMessage";
export { useOfflineMessageOutbox } from "./hooks/useOfflineMessageOutbox";
export { useToggleMessageReaction } from "./hooks/useToggleMessageReaction";

export { markMessageAsDeletedInCache } from "./utils/delete-message-cache.utils";
export { applyMessageEditedInCache } from "./utils/edit-message-cache.utils";
export { createClientMessageId } from "./utils/client-message-id.utils";
export { messageOutboxRepository } from "./offline/message-outbox.repository";
export { applyMessageReactionsInCache } from "./utils/message-reaction-cache.utils";
export {
  applyReceiptUpdateInCache,
  upsertIncomingMessageInCache,
} from "./utils/message-cache.utils";
export {
  formatMessageDayLabel,
  getMessageDayKey,
} from "./utils/message-day.utils";

export type {
  ChatMessageItem,
  ChatMessagesResponse,
  CreateMessagePayload,
  CreateMessageResponse,
  EditMessagePayload,
  EditMessageResponse,
  MessageDeletedEventPayload,
  MessageEditedEventPayload,
  MessageNewEventPayload,
  MessageReactionItem,
  MessageReactionUpdatedEventPayload,
  MessageReceiptUpdatePayload,
  MessageTick,
  ToggleMessageReactionResponse,
} from "./types/message.types";
