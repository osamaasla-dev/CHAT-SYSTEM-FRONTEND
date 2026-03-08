import type {
  ChatMessageItem,
  MessageLocalState,
} from "../types/message.types";

export const isPendingMessageState = (
  localState?: MessageLocalState,
): boolean => localState === "PENDING";

export const isOptimisticMessage = (
  message: Pick<ChatMessageItem, "localState">,
): boolean => isPendingMessageState(message.localState);
