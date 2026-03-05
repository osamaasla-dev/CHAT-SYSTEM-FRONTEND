export type MessageOutboxRecord = {
  clientMessageId: string;
  chatId: string;
  content: string;
  createdAt: string;
  nextRetryAt: string;
  retryCount: number;
};

export type QueueMessageParams = {
  clientMessageId: string;
  chatId: string;
  content: string;
  createdAt?: string;
};
