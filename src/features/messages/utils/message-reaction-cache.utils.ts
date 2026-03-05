import type { InfiniteData } from "@tanstack/react-query";

import type {
  ChatMessagesResponse,
  MessageReactionItem,
  MessageReactionUpdatedEventPayload,
  ToggleMessageReactionResponse,
} from "../types/message.types";

type ReactionUpdatePayload = Pick<
  ToggleMessageReactionResponse,
  "messageId" | "reactions"
> &
  Partial<Pick<ToggleMessageReactionResponse, "chatId">>;

type OptimisticReactionTogglePayload = {
  messageId: string;
  emoji: string;
};

const toggleReactionListOptimistically = (
  reactions: MessageReactionItem[],
  emoji: string,
): MessageReactionItem[] => {
  const normalizedEmoji = emoji.trim();
  if (!normalizedEmoji) {
    return reactions;
  }

  const nextReactions = reactions.map((reaction) => ({ ...reaction }));
  const myCurrentReactionIndex = nextReactions.findIndex(
    (reaction) => reaction.reactedByMe,
  );

  if (
    myCurrentReactionIndex >= 0 &&
    nextReactions[myCurrentReactionIndex].emoji === normalizedEmoji
  ) {
    const myCurrentReaction = nextReactions[myCurrentReactionIndex];
    if (myCurrentReaction.count <= 1) {
      nextReactions.splice(myCurrentReactionIndex, 1);
    } else {
      nextReactions[myCurrentReactionIndex] = {
        ...myCurrentReaction,
        count: myCurrentReaction.count - 1,
        reactedByMe: false,
      };
    }

    return nextReactions;
  }

  let insertionIndex = nextReactions.length;

  if (myCurrentReactionIndex >= 0) {
    const myCurrentReaction = nextReactions[myCurrentReactionIndex];
    insertionIndex = myCurrentReactionIndex;

    if (myCurrentReaction.count <= 1) {
      nextReactions.splice(myCurrentReactionIndex, 1);
    } else {
      nextReactions[myCurrentReactionIndex] = {
        ...myCurrentReaction,
        count: myCurrentReaction.count - 1,
        reactedByMe: false,
      };
      insertionIndex = myCurrentReactionIndex + 1;
    }
  }

  const nextReactionIndex = nextReactions.findIndex(
    (reaction) => reaction.emoji === normalizedEmoji,
  );

  if (nextReactionIndex >= 0) {
    nextReactions[nextReactionIndex] = {
      ...nextReactions[nextReactionIndex],
      count: nextReactions[nextReactionIndex].count + 1,
      reactedByMe: true,
    };
  } else {
    const boundedInsertionIndex = Math.max(
      0,
      Math.min(insertionIndex, nextReactions.length),
    );

    nextReactions.splice(boundedInsertionIndex, 0, {
      emoji: normalizedEmoji,
      count: 1,
      reactedByMe: true,
    });
  }

  return nextReactions;
};

export const toggleMessageReactionOptimisticallyInCache = (
  current: InfiniteData<ChatMessagesResponse> | undefined,
  payload: OptimisticReactionTogglePayload,
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
              reactions: toggleReactionListOptimistically(
                item.reactions,
                payload.emoji,
              ),
            }
          : item,
      ),
    })),
  };
};

export const applyMessageReactionsInCache = (
  current: InfiniteData<ChatMessagesResponse> | undefined,
  payload: ReactionUpdatePayload | MessageReactionUpdatedEventPayload,
): InfiniteData<ChatMessagesResponse> | undefined => {
  if (!current || current.pages.length === 0) {
    return current;
  }

  const reactions: MessageReactionItem[] = payload.reactions;

  return {
    ...current,
    pages: current.pages.map((page) => ({
      ...page,
      items: page.items.map((item) =>
        item.id === payload.messageId
          ? {
              ...item,
              reactions,
            }
          : item,
      ),
    })),
  };
};
