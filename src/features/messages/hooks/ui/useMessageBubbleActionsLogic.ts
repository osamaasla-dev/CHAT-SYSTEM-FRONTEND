import { useEffect, useMemo, useState } from "react";

import {
  MESSAGE_DELETE_WINDOW_MS,
  MESSAGE_EDIT_WINDOW_MS,
} from "../../constants/message.constants";
import { useDeleteMessage } from "../useDeleteMessage";

export type UseMessageBubbleActionsLogicParams = {
  chatId: string;
  messageId: string;
  createdAt: string;
  contentType: "TEXT" | "IMAGE";
  isOwn: boolean;
  isDeleted: boolean;
};

export const useMessageBubbleActionsLogic = ({
  chatId,
  messageId,
  createdAt,
  contentType,
  isOwn,
  isDeleted,
}: UseMessageBubbleActionsLogicParams) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTimeMs, setCurrentTimeMs] = useState<number>(() => Date.now());
  const { mutateAsync: deleteMessage, isPending: isDeleting } =
    useDeleteMessage(chatId);

  const deleteWindowEndsAtMs = useMemo(() => {
    const messageCreatedAtMs = new Date(createdAt).getTime();
    if (Number.isNaN(messageCreatedAtMs)) {
      return null;
    }

    return messageCreatedAtMs + MESSAGE_DELETE_WINDOW_MS;
  }, [createdAt]);

  const editWindowEndsAtMs = useMemo(() => {
    const messageCreatedAtMs = new Date(createdAt).getTime();
    if (Number.isNaN(messageCreatedAtMs)) {
      return null;
    }

    return messageCreatedAtMs + MESSAGE_EDIT_WINDOW_MS;
  }, [createdAt]);

  const canDeleteMessage = useMemo(() => {
    if (
      !isOwn ||
      isDeleted ||
      deleteWindowEndsAtMs === null ||
      messageId.startsWith("optimistic-")
    ) {
      return false;
    }

    return currentTimeMs <= deleteWindowEndsAtMs;
  }, [currentTimeMs, deleteWindowEndsAtMs, isDeleted, isOwn, messageId]);

  const canEditMessage = useMemo(() => {
    if (
      !isOwn ||
      isDeleted ||
      contentType !== "TEXT" ||
      editWindowEndsAtMs === null
    ) {
      return false;
    }

    if (messageId.startsWith("optimistic-")) {
      return false;
    }

    return currentTimeMs <= editWindowEndsAtMs;
  }, [
    contentType,
    currentTimeMs,
    editWindowEndsAtMs,
    isDeleted,
    isOwn,
    messageId,
  ]);

  useEffect(() => {
    const actionWindowEndsAtMs = [deleteWindowEndsAtMs, editWindowEndsAtMs]
      .filter((value): value is number => value !== null)
      .sort((left, right) => right - left)[0];

    if (
      (!canDeleteMessage && !canEditMessage) ||
      actionWindowEndsAtMs === undefined
    ) {
      return;
    }

    const remainingMs = actionWindowEndsAtMs - currentTimeMs;
    if (remainingMs <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCurrentTimeMs(actionWindowEndsAtMs + 1);
    }, remainingMs + 50);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    canDeleteMessage,
    canEditMessage,
    currentTimeMs,
    deleteWindowEndsAtMs,
    editWindowEndsAtMs,
  ]);

  const handleConfirmDelete = async () => {
    if (!isOwn || isDeleted) {
      return;
    }

    if (!canDeleteMessage) {
      return;
    }

    await deleteMessage({ messageId });
  };

  return {
    canEditMessage,
    canDeleteMessage,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isDeleting,
    handleConfirmDelete,
  };
};
