import type { InfiniteData } from "@tanstack/react-query";
import type { Socket } from "socket.io-client";

import type {
  ChatMessagesResponse,
  MessageDeletedEventPayload,
  MessageEditedEventPayload,
  MessageNewEventPayload,
  MessageReactionUpdatedEventPayload,
  MessageReceiptUpdatePayload,
} from "@/features/messages";
import {
  CHAT_MESSAGES_QUERY_KEY,
  applyMessageEditedInCache,
  applyMessageReactionsInCache,
  applyReceiptUpdateInCache,
  messageOutboxRepository,
  markMessageAsDeletedInCache,
  upsertIncomingMessageInCache,
} from "@/features/messages";
import { queryClient } from "@/shared/lib/query-client";
import { SOCKET_EVENTS } from "../events";

const isChatMessagesQueryObserved = (chatId: string): boolean => {
  const query = queryClient.getQueryCache().find({
    queryKey: CHAT_MESSAGES_QUERY_KEY(chatId),
  });

  if (!query) {
    return false;
  }

  return query.getObserversCount() > 0;
};

export const messageListeners = {
  newMessage(socket: Socket) {
    socket.on(SOCKET_EVENTS.MESSAGE_NEW, (payload: MessageNewEventPayload) => {
      if (payload.message.isOwn && payload.message.clientMessageId) {
        void messageOutboxRepository.removeByClientMessageId(
          payload.message.clientMessageId,
        );
      }

      const shouldFlagUnreadOnLoad = !isChatMessagesQueryObserved(
        payload.chatId,
      );

      queryClient.setQueryData<InfiniteData<ChatMessagesResponse>>(
        CHAT_MESSAGES_QUERY_KEY(payload.chatId),
        (current) =>
          upsertIncomingMessageInCache(
            current,
            payload.message,
            shouldFlagUnreadOnLoad,
          ),
      );
    });
  },

  receiptUpdate(socket: Socket) {
    socket.on(
      SOCKET_EVENTS.MESSAGE_RECEIPT_UPDATE,
      (payload: MessageReceiptUpdatePayload) => {
        queryClient.setQueryData<InfiniteData<ChatMessagesResponse>>(
          CHAT_MESSAGES_QUERY_KEY(payload.chatId),
          (current) => applyReceiptUpdateInCache(current, payload),
        );
      },
    );
  },

  deletedMessage(socket: Socket) {
    socket.on(
      SOCKET_EVENTS.MESSAGE_DELETED,
      (payload: MessageDeletedEventPayload) => {
        queryClient.setQueryData<InfiniteData<ChatMessagesResponse>>(
          CHAT_MESSAGES_QUERY_KEY(payload.chatId),
          (current) => markMessageAsDeletedInCache(current, payload.messageId),
        );
      },
    );
  },

  editedMessage(socket: Socket) {
    socket.on(
      SOCKET_EVENTS.MESSAGE_EDITED,
      (payload: MessageEditedEventPayload) => {
        queryClient.setQueryData<InfiniteData<ChatMessagesResponse>>(
          CHAT_MESSAGES_QUERY_KEY(payload.chatId),
          (current) => applyMessageEditedInCache(current, payload),
        );
      },
    );
  },

  reactionUpdated(socket: Socket) {
    socket.on(
      SOCKET_EVENTS.MESSAGE_REACTION_UPDATED,
      (payload: MessageReactionUpdatedEventPayload) => {
        queryClient.setQueryData<InfiniteData<ChatMessagesResponse>>(
          CHAT_MESSAGES_QUERY_KEY(payload.chatId),
          (current) => applyMessageReactionsInCache(current, payload),
        );
      },
    );
  },

  attachAll(socket: Socket) {
    this.newMessage(socket);
    this.receiptUpdate(socket);
    this.deletedMessage(socket);
    this.editedMessage(socket);
    this.reactionUpdated(socket);
  },
};
