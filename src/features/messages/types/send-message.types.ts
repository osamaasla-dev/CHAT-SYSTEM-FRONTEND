export type SendMessageVariables = {
  chatId: string;
  content: string;
  clientMessageId: string;
  createdAt: string;
};

export type SendMessageMutationContext = {
  optimisticMessageId: string;
  targetChatId: string;
};
