import type { InfiniteData } from "@tanstack/react-query";

import type {
  ChatMessageItem,
  ChatMessagesResponse,
  MessageReceiptUpdatePayload,
} from "../types/message.types";

const OPTIMISTIC_MESSAGE_ID_PREFIX = "optimistic-";
const MAX_OPTIMISTIC_MATCH_TIME_DIFF_MS = 90_000;

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
    // Keep local composed timestamp to prevent temporary order jumps on sync.
    createdAt: existingMessage.createdAt,
    clientCreatedAt:
      existingMessage.clientCreatedAt ?? existingMessage.createdAt,
    localState: undefined,
  };
};

const hasClientMessageId = (
  message: ChatMessageItem,
): message is ChatMessageItem & { clientMessageId: string } =>
  typeof message.clientMessageId === "string" && message.clientMessageId.length > 0;

const isOptimisticMessage = (message: ChatMessageItem): boolean =>
  message.id.startsWith(OPTIMISTIC_MESSAGE_ID_PREFIX);

const getTimestampMs = (isoDate: string): number | null => {
  const timestamp = new Date(isoDate).getTime();
  return Number.isNaN(timestamp) ? null : timestamp;
};

const dedupeByMessageIdAndClientMessageId = (
  pagesItems: ChatMessageItem[][],
): ChatMessageItem[][] => {
  const seenIds = new Set<string>();
  const seenOwnClientMessageIds = new Set<string>();

  return pagesItems.map((items) =>
    items.filter((item) => {
      if (seenIds.has(item.id)) {
        return false;
      }
      seenIds.add(item.id);

      if (item.isOwn && hasClientMessageId(item)) {
        if (seenOwnClientMessageIds.has(item.clientMessageId)) {
          return false;
        }

        seenOwnClientMessageIds.add(item.clientMessageId);
      }

      return true;
    }),
  );
};

const mapAndDedupe = (
  current: InfiniteData<ChatMessagesResponse>,
  mapItem: (item: ChatMessageItem) => ChatMessageItem,
): InfiniteData<ChatMessagesResponse> => {
  const mappedPages = current.pages.map((page) => ({
    ...page,
    items: page.items.map(mapItem),
  }));

  const dedupedItemsByPage = dedupeByMessageIdAndClientMessageId(
    mappedPages.map((page) => page.items),
  );

  return {
    ...current,
    pages: mappedPages.map((page, pageIndex) => ({
      ...page,
      items: dedupedItemsByPage[pageIndex],
    })),
  };
};

const replaceOptimisticByClientMessageId = (
  current: InfiniteData<ChatMessagesResponse>,
  persistedMessage: ChatMessageItem,
): InfiniteData<ChatMessagesResponse> | null => {
  if (!persistedMessage.isOwn || !hasClientMessageId(persistedMessage)) {
    return null;
  }

  const optimisticMessageId = `${OPTIMISTIC_MESSAGE_ID_PREFIX}${persistedMessage.clientMessageId}`;
  let didReplace = false;

  const next = mapAndDedupe(current, (item) => {
    if (item.id === optimisticMessageId) {
      didReplace = true;
      return toPersistedMessageWithLocalOrder(persistedMessage, item);
    }

    if (
      item.isOwn &&
      hasClientMessageId(item) &&
      item.clientMessageId === persistedMessage.clientMessageId
    ) {
      didReplace = true;
      return toPersistedMessageWithLocalOrder(persistedMessage, item);
    }

    return item;
  });

  return didReplace ? next : null;
};

const findMatchingOptimisticMessageIdByHeuristic = (
  current: InfiniteData<ChatMessagesResponse>,
  incomingMessage: ChatMessageItem,
): string | null => {
  if (!incomingMessage.isOwn || incomingMessage.isDeleted) {
    return null;
  }

  const incomingTimestampMs = getTimestampMs(incomingMessage.createdAt);
  let matchedMessageId: string | null = null;
  let bestTimeDiffMs = Number.POSITIVE_INFINITY;

  for (const page of current.pages) {
    for (const item of page.items) {
      if (!isOptimisticMessage(item) || !item.isOwn || item.isDeleted) {
        continue;
      }

      if (
        item.contentType !== incomingMessage.contentType ||
        item.content !== incomingMessage.content
      ) {
        continue;
      }

      if (incomingTimestampMs === null) {
        return item.id;
      }

      const optimisticTimestampMs = getTimestampMs(item.createdAt);
      if (optimisticTimestampMs === null) {
        continue;
      }

      const timeDiffMs = Math.abs(incomingTimestampMs - optimisticTimestampMs);
      if (timeDiffMs > MAX_OPTIMISTIC_MATCH_TIME_DIFF_MS) {
        continue;
      }

      if (timeDiffMs < bestTimeDiffMs) {
        bestTimeDiffMs = timeDiffMs;
        matchedMessageId = item.id;
      }
    }
  }

  return matchedMessageId;
};

const replaceOptimisticByMessageId = (
  current: InfiniteData<ChatMessagesResponse>,
  optimisticMessageId: string,
  persistedMessage: ChatMessageItem,
): InfiniteData<ChatMessagesResponse> => {
  let didReplace = false;

  const next = mapAndDedupe(current, (item) => {
    if (item.id === optimisticMessageId) {
      didReplace = true;
      return toPersistedMessageWithLocalOrder(persistedMessage, item);
    }

    return item;
  });

  if (!didReplace) {
    return current;
  }

  return next;
};

export const upsertIncomingMessageInCache = (
  current: InfiniteData<ChatMessagesResponse> | undefined,
  incomingMessage: ChatMessageItem,
  shouldFlagUnreadOnLoad: boolean,
): InfiniteData<ChatMessagesResponse> => {
  const normalizedIncomingMessage: ChatMessageItem = {
    ...incomingMessage,
    localState: undefined,
    wasUnreadOnLoad:
      incomingMessage.wasUnreadOnLoad ??
      (shouldFlagUnreadOnLoad &&
        !incomingMessage.isOwn &&
        incomingMessage.isUnread),
  };

  if (!current || current.pages.length === 0) {
    return {
      pages: [
        {
          items: [normalizedIncomingMessage],
          meta: {
            limit: 20,
            nextCursor: null,
          },
        },
      ],
      pageParams: [undefined],
    };
  }

  const alreadyExists = current.pages.some((page) =>
    page.items.some((item) => item.id === normalizedIncomingMessage.id),
  );
  if (alreadyExists) {
    return current;
  }

  const replacedByClientMessageId = replaceOptimisticByClientMessageId(
    current,
    normalizedIncomingMessage,
  );
  if (replacedByClientMessageId) {
    return replacedByClientMessageId;
  }

  // Backward-compatible fallback for legacy payloads that may not include clientMessageId.
  const optimisticMessageId = findMatchingOptimisticMessageIdByHeuristic(
    current,
    normalizedIncomingMessage,
  );
  if (optimisticMessageId) {
    return replaceOptimisticByMessageId(
      current,
      optimisticMessageId,
      normalizedIncomingMessage,
    );
  }

  const [firstPage, ...restPages] = current.pages;
  return {
    ...current,
    pages: [
      {
        ...firstPage,
        items: [normalizedIncomingMessage, ...firstPage.items],
      },
      ...restPages,
    ],
  };
};

export const applyReceiptUpdateInCache = (
  current: InfiniteData<ChatMessagesResponse> | undefined,
  payload: MessageReceiptUpdatePayload,
): InfiniteData<ChatMessagesResponse> | undefined => {
  if (
    !current ||
    current.pages.length === 0 ||
    payload.messageIds.length === 0
  ) {
    return current;
  }

  const messageIds = new Set(payload.messageIds);

  return {
    ...current,
    pages: current.pages.map((page) => ({
      ...page,
      items: page.items.map((item) =>
        messageIds.has(item.id)
          ? {
              ...item,
              ticks: payload.ticks,
            }
          : item,
      ),
    })),
  };
};
