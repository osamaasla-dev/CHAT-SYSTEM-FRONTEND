import { useMessageBubbleActionsLogic } from "../hooks/ui";
import type { MessageLocalState } from "../types/message.types";
import { MessageBubbleActionsMenu } from "./MessageBubbleActionsMenu";
import { MessageBubbleDeleteDialog } from "./MessageBubbleDeleteDialog";

export type MessageBubbleActionsProps = {
  chatId: string;
  messageId: string;
  createdAt: string;
  contentType: "TEXT" | "IMAGE";
  isOwn: boolean;
  isDeleted: boolean;
  localState?: MessageLocalState;
  onEditRequested: () => void;
};

export const MessageBubbleActions = ({
  chatId,
  messageId,
  createdAt,
  contentType,
  isOwn,
  isDeleted,
  localState,
  onEditRequested,
}: MessageBubbleActionsProps) => {
  const {
    canEditMessage,
    canDeleteMessage,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isDeleting,
    handleConfirmDelete,
  } = useMessageBubbleActionsLogic({
    chatId,
    messageId,
    createdAt,
    contentType,
    isOwn,
    isDeleted,
    localState,
  });

  if (!canDeleteMessage && !canEditMessage) {
    return null;
  }

  return (
    <>
      <MessageBubbleActionsMenu
        canEditMessage={canEditMessage}
        canDeleteMessage={canDeleteMessage}
        onEditRequested={onEditRequested}
        onOpenDeleteDialog={() => setIsDeleteDialogOpen(true)}
      />
      <MessageBubbleDeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        isDeleting={isDeleting}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  );
};
