import Dexie from "dexie";

import { messageOutboxDb } from "./message-outbox.db";
import type {
  MessageOutboxRecord,
  QueueMessageParams,
} from "./message-outbox.types";

const toIsoOrNow = (value?: string): string => value ?? new Date().toISOString();

export const messageOutboxRepository = {
  async enqueue(params: QueueMessageParams): Promise<void> {
    const createdAt = toIsoOrNow(params.createdAt);

    const nextRecord: MessageOutboxRecord = {
      clientMessageId: params.clientMessageId,
      chatId: params.chatId,
      content: params.content,
      createdAt,
      nextRetryAt: createdAt,
      retryCount: 0,
    };

    await messageOutboxDb.outbox.put(nextRecord);
  },

  async removeByClientMessageId(clientMessageId: string): Promise<void> {
    await messageOutboxDb.outbox.delete(clientMessageId);
  },

  async getOldestQueued(): Promise<MessageOutboxRecord | null> {
    const record = await messageOutboxDb.outbox
      .orderBy("[createdAt+clientMessageId]")
      .first();

    return record ?? null;
  },

  async listByChatId(chatId: string): Promise<MessageOutboxRecord[]> {
    const records = await messageOutboxDb.outbox
      .where("[chatId+createdAt+clientMessageId]")
      .between(
        [chatId, Dexie.minKey, Dexie.minKey],
        [chatId, Dexie.maxKey, Dexie.maxKey],
      )
      .reverse()
      .toArray();

    return records;
  },

  async rescheduleRetry(
    clientMessageId: string,
    nextRetryAt: string,
    retryCount: number,
  ): Promise<void> {
    await messageOutboxDb.outbox.update(clientMessageId, {
      nextRetryAt,
      retryCount,
    });
  },

  async getNextRetryAt(): Promise<string | null> {
    const oldestRecord = await this.getOldestQueued();
    return oldestRecord?.nextRetryAt ?? null;
  },
};
