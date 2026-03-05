import type { ChatMessageItem } from "../types/message.types";
import type { MessageOutboxRecord } from "./message-outbox.types";

const OPTIMISTIC_MESSAGE_ID_PREFIX = "optimistic-";

export const buildOptimisticMessageId = (clientMessageId: string): string =>
  `${OPTIMISTIC_MESSAGE_ID_PREFIX}${clientMessageId}`;

export const mapOutboxRecordToOptimisticMessage = (
  record: MessageOutboxRecord,
): ChatMessageItem => ({
  id: buildOptimisticMessageId(record.clientMessageId),
  chatId: record.chatId,
  senderId: "optimistic",
  clientMessageId: record.clientMessageId,
  clientCreatedAt: record.createdAt,
  content: record.content,
  contentType: "TEXT",
  reactions: [],
  createdAt: record.createdAt,
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
});

export const mergeOutboxMessagesWithFetchedMessages = (
  fetchedItems: ChatMessageItem[],
  outboxRecords: MessageOutboxRecord[],
): ChatMessageItem[] => {
  if (outboxRecords.length === 0) {
    return fetchedItems;
  }

  const outboxByClientMessageId = new Map(
    outboxRecords.map((record) => [record.clientMessageId, record]),
  );

  const enrichedFetchedItems = fetchedItems.map((item) => {
    if (!item.isOwn || typeof item.clientMessageId !== "string") {
      return item;
    }

    const outboxRecord = outboxByClientMessageId.get(item.clientMessageId);
    if (!outboxRecord) {
      return item;
    }

    return {
      ...item,
      clientCreatedAt: item.clientCreatedAt ?? outboxRecord.createdAt,
    };
  });

  const fetchedClientMessageIds = new Set(
    enrichedFetchedItems
      .filter(
        (item): item is ChatMessageItem & { clientMessageId: string } =>
          item.isOwn &&
          typeof item.clientMessageId === "string" &&
          item.clientMessageId.length > 0,
      )
      .map((item) => item.clientMessageId),
  );

  const pendingOptimisticItems = outboxRecords
    .filter((record) => !fetchedClientMessageIds.has(record.clientMessageId))
    .map(mapOutboxRecordToOptimisticMessage);

  if (pendingOptimisticItems.length === 0) {
    return enrichedFetchedItems;
  }

  return [...pendingOptimisticItems, ...enrichedFetchedItems];
};
