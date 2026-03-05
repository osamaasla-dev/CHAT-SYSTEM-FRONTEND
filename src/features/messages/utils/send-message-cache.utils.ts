import type { InfiniteData } from "@tanstack/react-query";

import type { ChatMessagesResponse } from "../types/message.types";
import type { SendMessageVariables } from "../types/send-message.types";
import { buildOptimisticMessageId } from "../offline/message-outbox-cache.utils";

type ChatMessageItem = ChatMessagesResponse["items"][number];

const DEFAULT_MESSAGES_LIMIT = 20;

const toPersistedMessageWithLocalOrder = (
  persistedMessage: ChatMessageItem,
  existingMessage?: ChatMessageItem,
): ChatMessageItem => {
  if (!existingMessage) {
    return {
      ...persistedMessage,
      localState: undefined,
    };
  }

  return {
    ...persistedMessage,
    // Preserve local composed timestamp to avoid visual re-ordering while syncing.
    createdAt: existingMessage.createdAt,
    clientCreatedAt:
      existingMessage.clientCreatedAt ?? existingMessage.createdAt,
    localState: undefined,
  };
};

const ensureFirstPage = (
  current: InfiniteData<ChatMessagesResponse> | undefined,
): InfiniteData<ChatMessagesResponse> => {
  if (current && current.pages.length > 0) {
    return current;
  }

  return {
    pages: [
      {
        items: [],
        meta: {
          limit: DEFAULT_MESSAGES_LIMIT,
          nextCursor: null,
        },
      },
    ],
    pageParams: [undefined],
  };
};

export const createOptimisticMessage = (
  variables: SendMessageVariables,
): ChatMessageItem => {
  const optimisticCreatedAt = variables.createdAt;

  return {
    id: buildOptimisticMessageId(variables.clientMessageId),
    chatId: variables.chatId,
    senderId: "optimistic",
    clientMessageId: variables.clientMessageId,
    clientCreatedAt: optimisticCreatedAt,
    content: variables.content,
    contentType: "TEXT",
    reactions: [],
    createdAt: optimisticCreatedAt,
    editedAt: null,
    isDeleted: false,
    isOwn: true,
    isUnread: false,
    wasUnreadOnLoad: false,
    localState: "PENDING",
    ticks: {
      visibleTicks: 1,
      isBlue: false,
    },
  };
};

export const prependMessageToFirstPage = (
  current: InfiniteData<ChatMessagesResponse> | undefined,
  message: ChatMessageItem,
): InfiniteData<ChatMessagesResponse> => {
  const safeCurrent = ensureFirstPage(current);
  const [firstPage, ...restPages] = safeCurrent.pages;

  return {
    ...safeCurrent,
    pages: [
      {
        ...firstPage,
        items: [message, ...firstPage.items],
      },
      ...restPages,
    ],
  };
};

export const removeMessageById = (
  current: InfiniteData<ChatMessagesResponse> | undefined,
  messageId: string,
): InfiniteData<ChatMessagesResponse> | undefined => {
  if (!current || current.pages.length === 0) {
    return current;
  }

  return {
    ...current,
    pages: current.pages.map((page) => ({
      ...page,
      items: page.items.filter((item) => item.id !== messageId),
    })),
  };
};

export const replaceOptimisticMessage = (
  current: InfiniteData<ChatMessagesResponse> | undefined,
  optimisticMessageId: string,
  persistedMessage: ChatMessageItem,
): InfiniteData<ChatMessagesResponse> => {
  const safeCurrent = ensureFirstPage(current);
  let didReplace = false;
  const cachedPersistedMessage = safeCurrent.pages
    .flatMap((page) => page.items)
    .find((item) => item.id === persistedMessage.id);
  const canonicalPersistedMessage = cachedPersistedMessage ?? persistedMessage;

  const pagesWithReplacement = safeCurrent.pages.map((page) => ({
    ...page,
    items: page.items.map((item) => {
      if (item.id === optimisticMessageId) {
        didReplace = true;
        return toPersistedMessageWithLocalOrder(canonicalPersistedMessage, item);
      }
      return item;
    }),
  }));

  if (!didReplace) {
    const alreadyExists = pagesWithReplacement.some((page) =>
      page.items.some((item) => item.id === canonicalPersistedMessage.id),
    );

    if (alreadyExists) {
      return {
        ...safeCurrent,
        pages: pagesWithReplacement,
      };
    }

    const [firstPage, ...restPages] = pagesWithReplacement;
    return {
      ...safeCurrent,
      pages: [
        {
          ...firstPage,
          items: [canonicalPersistedMessage, ...firstPage.items],
        },
        ...restPages,
      ],
    };
  }

  const seenIds = new Set<string>();
  return {
    ...safeCurrent,
    pages: pagesWithReplacement.map((page) => ({
      ...page,
      items: page.items.filter((item) => {
        if (item.id !== canonicalPersistedMessage.id) {
          return true;
        }

        if (seenIds.has(item.id)) {
          return false;
        }

        seenIds.add(item.id);
        return true;
      }),
    })),
  };
};
