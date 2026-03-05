import type { InfiniteData } from "@tanstack/react-query";

import type { ChatMessagesResponse } from "../types/message.types";

export const markMessageAsDeletedInCache = (
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
      items: page.items.map((item) =>
        item.id === messageId
          ? {
              ...item,
              content: null,
              isDeleted: true,
              isUnread: false,
            }
          : item,
      ),
    })),
  };
};
