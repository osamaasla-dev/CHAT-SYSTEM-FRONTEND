import type { InfiniteData } from "@tanstack/react-query";

import type {
  ChatMessagesResponse,
  EditMessageResponse,
  MessageEditedEventPayload,
} from "../types/message.types";

type EditMessageCachePayload = Pick<
  EditMessageResponse,
  "messageId" | "content" | "editedAt"
> &
  Partial<Pick<EditMessageResponse, "chatId">>;

export const applyMessageEditedInCache = (
  current: InfiniteData<ChatMessagesResponse> | undefined,
  payload: EditMessageCachePayload | MessageEditedEventPayload,
): InfiniteData<ChatMessagesResponse> | undefined => {
  if (!current || current.pages.length === 0) {
    return current;
  }

  return {
    ...current,
    pages: current.pages.map((page) => ({
      ...page,
      items: page.items.map((item) =>
        item.id === payload.messageId
          ? {
              ...item,
              content: payload.content,
              editedAt: payload.editedAt,
            }
          : item,
      ),
    })),
  };
};
