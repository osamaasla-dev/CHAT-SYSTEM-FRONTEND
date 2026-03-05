import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useChatStore } from "@/features/app/stores/chat.store";
import { usePresenceStore } from "@/features/app/stores/presence.store";
import {
  createClientMessageId,
  formatMessageDayLabel,
  getMessageDayKey,
  type ChatMessageItem,
  useChatMessages,
  useMarkMessagesSeen,
  useSendMessage,
} from "@/features/messages";
import { chatEmitters } from "@/features/websocket";
import { SOCKET_EVENTS } from "@/features/websocket/events";
import { getSocketInstance } from "@/features/websocket/socket.instance";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { useGetPrivateChat } from "../useGetPrivateChat";

export type UseChatTabLogicParams = {
  userId: string;
};

type ChatTypingEventPayload = {
  chatId: string;
  userId: string;
  isTyping: boolean;
};

type ChatTimelineDateItem = {
  type: "date";
  key: string;
  label: string;
};

type ChatTimelineMessageItem = {
  type: "message";
  key: string;
  message: ChatMessageItem;
};

export type ChatTimelineItem = ChatTimelineDateItem | ChatTimelineMessageItem;

const MESSAGES_PAGE_SIZE = 20;

const getMessageOrderTimestamp = (message: ChatMessageItem): number => {
  const candidateTimestamp = new Date(
    message.clientCreatedAt ?? message.createdAt,
  ).getTime();

  if (Number.isNaN(candidateTimestamp)) {
    return new Date(message.createdAt).getTime();
  }

  return candidateTimestamp;
};

export const useChatTabLogic = ({ userId }: UseChatTabLogicParams) => {
  const blockedByRealtime = useChatStore(
    (state) => state.blockedUsers[userId] ?? false,
  );
  const presence = usePresenceStore((state) =>
    userId ? state.presences[userId] : undefined,
  );

  const { data: privateChat, isLoading: isChatLoading } = useGetPrivateChat(userId);
  const chatId = privateChat?.id ?? "";

  const messagesQuery = useChatMessages(chatId, MESSAGES_PAGE_SIZE);
  const { mutate: sendMessage } = useSendMessage(chatId);
  const { mutate: markMessagesSeen, isPending: isMarkingSeen } =
    useMarkMessagesSeen(chatId);

  const [remoteTypingEvent, setRemoteTypingEvent] =
    useState<ChatTypingEventPayload | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const pendingScrollAdjustRef = useRef<number | null>(null);

  const messages = useMemo<ChatMessageItem[]>(() => {
    const merged = messagesQuery.data?.pages.flatMap((page) => page.items) ?? [];
    return [...merged].sort((left, right) => {
      const orderDiff =
        getMessageOrderTimestamp(left) - getMessageOrderTimestamp(right);

      if (orderDiff !== 0) {
        return orderDiff;
      }

      return new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime();
    });
  }, [messagesQuery.data]);

  const isConversationBlocked = Boolean(
    privateChat &&
      (blockedByRealtime ||
        privateChat.otherUser.isBlockedByMe ||
        privateChat.otherUser.isBlockedByOther),
  );

  const unreadBoundaryMessageId = useMemo(() => {
    const firstUnreadOnLoadMessage = messages.find(
      (message) => !message.isOwn && message.wasUnreadOnLoad,
    );
    return firstUnreadOnLoadMessage?.id ?? null;
  }, [messages]);

  const timelineItems = useMemo<ChatTimelineItem[]>(() => {
    const now = new Date();

    return messages.flatMap((message, index) => {
      const messageDayDateSource = message.clientCreatedAt ?? message.createdAt;
      const currentDayKey =
        getMessageDayKey(messageDayDateSource) ?? `unknown-${message.id}`;

      const previousMessage = index > 0 ? messages[index - 1] : null;
      const previousMessageDayDateSource = previousMessage
        ? previousMessage.clientCreatedAt ?? previousMessage.createdAt
        : null;
      const previousDayKey = previousMessage
        ? getMessageDayKey(previousMessageDayDateSource ?? previousMessage.createdAt) ??
          `unknown-${previousMessage.id}`
        : null;

      const items: ChatTimelineItem[] = [];
      const shouldShowDateSeparator = currentDayKey !== previousDayKey;

      if (shouldShowDateSeparator) {
        const dayLabel = formatMessageDayLabel(messageDayDateSource, now);
        if (dayLabel) {
          items.push({
            type: "date",
            key: `date-${currentDayKey}`,
            label: dayLabel,
          });
        }
      }

      items.push({
        type: "message",
        key: message.id,
        message,
      });

      return items;
    });
  }, [messages]);

  useEffect(() => {
    if (!chatId) {
      return;
    }

    chatEmitters.join(chatId);
    return () => {
      chatEmitters.leave(chatId);
    };
  }, [chatId]);

  useEffect(() => {
    const socket = getSocketInstance();
    if (!socket) {
      return;
    }

    const handleTyping = (payload: ChatTypingEventPayload) => {
      if (payload.chatId !== chatId || payload.userId !== userId) {
        return;
      }
      setRemoteTypingEvent(payload);
    };

    socket.on(SOCKET_EVENTS.CHAT_TYPING, handleTyping);

    return () => {
      socket.off(SOCKET_EVENTS.CHAT_TYPING, handleTyping);
    };
  }, [chatId, userId]);

  const handleLoadMore = () => {
    const container = messagesContainerRef.current;
    if (container) {
      pendingScrollAdjustRef.current = container.scrollHeight;
    }
    void messagesQuery.fetchNextPage();
  };

  useInfiniteScroll({
    sentinelRef,
    rootRef: messagesContainerRef,
    hasNextPage: Boolean(messagesQuery.hasNextPage),
    isFetching: messagesQuery.isFetchingNextPage,
    onLoadMore: handleLoadMore,
    rootMargin: "0px",
    threshold: 0,
    enabled: Boolean(chatId && messagesQuery.hasNextPage),
  });

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || messages.length === 0) {
      return;
    }

    if (pendingScrollAdjustRef.current !== null) {
      const previousHeight = pendingScrollAdjustRef.current;
      const nextHeight = container.scrollHeight;
      container.scrollTop += nextHeight - previousHeight;
      pendingScrollAdjustRef.current = null;
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [messages.length]);

  useEffect(() => {
    if (!chatId || isConversationBlocked || messages.length === 0 || isMarkingSeen) {
      return;
    }

    const hasUnreadIncomingMessages = messages.some(
      (message) => !message.isOwn && message.isUnread,
    );

    if (hasUnreadIncomingMessages) {
      markMessagesSeen();
    }
  }, [
    chatId,
    isConversationBlocked,
    isMarkingSeen,
    markMessagesSeen,
    messages,
  ]);

  const handleSendMessage = useCallback(
    (content: string) => {
      if (!chatId) {
        return;
      }
      const createdAt = new Date().toISOString();

      sendMessage({
        chatId,
        content,
        clientMessageId: createClientMessageId(),
        createdAt,
      });
    },
    [chatId, sendMessage],
  );

  const isRemoteTyping =
    remoteTypingEvent?.chatId === chatId &&
    remoteTypingEvent.userId === userId &&
    remoteTypingEvent.isTyping;

  return {
    privateChat,
    isChatLoading,
    presence,
    timelineItems,
    unreadBoundaryMessageId,
    isConversationBlocked,
    typingLabel: !isConversationBlocked && isRemoteTyping ? "typing..." : undefined,
    messagesContainerRef,
    sentinelRef,
    handleSendMessage,
  };
};
