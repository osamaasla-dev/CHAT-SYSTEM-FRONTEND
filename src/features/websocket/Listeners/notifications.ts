import { createElement } from "react";
import toast from "react-hot-toast";
import type { Socket } from "socket.io-client";

import { useChatStore } from "@/features/app/stores/chat.store";
import type { PrivateChatResponse } from "@/features/chats/types/chat.types";
import { GET_PRIVATE_CHAT_QUERY_KEY } from "@/features/chats/hooks/useGetPrivateChat";
import {
  setNotificationsUnreadCountCache,
  type NotificationItem,
} from "@/features/notifications";
import { queryClient } from "@/shared/lib/query-client";
import { SOCKET_EVENTS } from "../events";

type NotificationNewPayload = {
  notification: NotificationItem;
  unreadCount: number;
};

type NotificationUnreadCountPayload = {
  unreadCount: number;
};

const isNotificationForOpenedChat = (notification: NotificationItem): boolean => {
  const selectedUserId = useChatStore.getState().selectedUserId;
  if (!selectedUserId) {
    return false;
  }

  if (notification.actorId === selectedUserId) {
    return true;
  }

  if (!notification.chatId) {
    return false;
  }

  const openedChat = queryClient.getQueryData<PrivateChatResponse>(
    GET_PRIVATE_CHAT_QUERY_KEY(selectedUserId),
  );

  return openedChat?.id === notification.chatId;
};

const showNotificationToast = (notification: NotificationItem) => {
  if (isNotificationForOpenedChat(notification)) {
    return;
  }

  const sender = notification.title?.trim();
  const body = notification.body?.trim();
  if (!sender && !body) {
    return;
  }

  const toastContent = createElement(
    "div",
    { className: "text-sm leading-relaxed" },
    sender
      ? createElement(
          "span",
          { className: "font-bold text-primary-dark" },
          sender,
        )
      : null,
    sender && body
      ? createElement("span", { className: "text-primary" }, ": ")
      : null,
    body ? createElement("span", { className: "text-primary" }, body) : null,
  );

  toast(toastContent, {
    id: `notification:${notification.id}`,
  });
};

export const notificationListeners = {
  newNotification(socket: Socket) {
    socket.on(
      SOCKET_EVENTS.NOTIFICATION_NEW,
      (payload: NotificationNewPayload) => {
        setNotificationsUnreadCountCache(queryClient, payload.unreadCount);
        showNotificationToast(payload.notification);
      },
    );
  },

  unreadCountUpdate(socket: Socket) {
    socket.on(
      SOCKET_EVENTS.NOTIFICATION_UNREAD_COUNT,
      (payload: NotificationUnreadCountPayload) => {
        setNotificationsUnreadCountCache(queryClient, payload.unreadCount);
      },
    );
  },

  attachAll(socket: Socket) {
    this.newNotification(socket);
    this.unreadCountUpdate(socket);
  },
};
