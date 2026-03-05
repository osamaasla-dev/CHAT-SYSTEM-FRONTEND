import { useInfiniteQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { getMessageReactionsApi } from "../services/message.api";
import type { MessageReactionsDetailsResponse } from "../types/message.types";

const DEFAULT_LIMIT = 20;
export const MESSAGE_REACTIONS_QUERY_KEY = (
  messageId: string,
  emoji: string | null,
) => ["messages", "reactions", "details", messageId, emoji ?? "ALL"] as const;

export const MESSAGE_REACTIONS_QUERY_PREFIX = (messageId: string) =>
  ["messages", "reactions", "details", messageId] as const;

export const useMessageReactions = (params: {
  messageId: string;
  emoji?: string | null;
  enabled?: boolean;
  limit?: number;
}) => {
  const { messageId, emoji, enabled = true, limit = DEFAULT_LIMIT } = params;
  const normalizedEmoji =
    typeof emoji === "string" && emoji.trim() ? emoji.trim() : null;

  return useInfiniteQuery<MessageReactionsDetailsResponse, ApiErrorResponse>({
    queryKey: MESSAGE_REACTIONS_QUERY_KEY(messageId, normalizedEmoji),
    queryFn: ({ pageParam }) =>
      getMessageReactionsApi({
        messageId,
        limit,
        cursor: typeof pageParam === "string" ? pageParam : undefined,
        emoji: normalizedEmoji ?? undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.meta.nextCursor ?? undefined,
    enabled: Boolean(enabled && messageId),
  });
};
