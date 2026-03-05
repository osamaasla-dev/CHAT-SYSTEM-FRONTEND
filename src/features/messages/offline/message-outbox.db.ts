import Dexie, { type EntityTable } from "dexie";

import type { MessageOutboxRecord } from "./message-outbox.types";

class MessageOutboxDexie extends Dexie {
  outbox!: EntityTable<MessageOutboxRecord, "clientMessageId">;

  constructor() {
    super("message-outbox-db");

    this.version(1).stores({
      outbox: "&clientMessageId, chatId, createdAt, nextRetryAt",
    });

    this.version(2).stores({
      outbox:
        "&clientMessageId, chatId, createdAt, nextRetryAt, [createdAt+clientMessageId]",
    });

    this.version(3).stores({
      outbox:
        "&clientMessageId, chatId, createdAt, nextRetryAt, [createdAt+clientMessageId], [chatId+createdAt+clientMessageId]",
    });
  }
}

export const messageOutboxDb = new MessageOutboxDexie();
