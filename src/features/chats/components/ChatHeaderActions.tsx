import { useChatHeaderActionsLogic } from "../hooks/ui";
import { ChatHeaderActionsDialogs } from "./ChatHeaderActionsDialogs";
import { ChatHeaderActionsMenu } from "./ChatHeaderActionsMenu";

export type ChatHeaderActionsProps = {
  chatId: string;
  blockedUserId: string;
  isBlocked: boolean;
  notificationsMuted: boolean;
  onClose: () => void;
};

export const ChatHeaderActions = ({
  chatId,
  blockedUserId,
  isBlocked,
  notificationsMuted,
  onClose,
}: ChatHeaderActionsProps) => {
  const {
    // block
    blockLabel,
    isBlockingMutating,
    handleBlockClick,

    // clear chat
    isClearing,
    isClearDialogOpen,
    setIsClearDialogOpen,
    handleConfirmClearChat,

    // delete chat
    isDeleting,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleConfirmDeleteChat,

    // mute / unmute
    isUpdatingMute,
    isMuteDialogOpen,
    setIsMuteDialogOpen,
    handleToggleMute,
    notificationsMuted: isMuted,

    // close
    handleCloseChat,
  } = useChatHeaderActionsLogic({
    chatId,
    blockedUserId,
    isBlocked,
    notificationsMuted,
    onClose,
  });

  return (
    <>
      <ChatHeaderActionsMenu
        chatId={chatId}
        isUpdatingMute={isUpdatingMute}
        isMuted={isMuted}
        onCloseChat={handleCloseChat}
        onToggleMute={handleToggleMute}
        isBlockingMutating={isBlockingMutating}
        blockLabel={blockLabel}
        onBlockClick={handleBlockClick}
        onOpenClearDialog={() => setIsClearDialogOpen(true)}
        onOpenDeleteDialog={() => setIsDeleteDialogOpen(true)}
      />
      <ChatHeaderActionsDialogs
        chatId={chatId}
        isClearDialogOpen={isClearDialogOpen}
        setIsClearDialogOpen={setIsClearDialogOpen}
        isClearing={isClearing}
        onConfirmClearChat={handleConfirmClearChat}
        isMuteDialogOpen={isMuteDialogOpen}
        setIsMuteDialogOpen={setIsMuteDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        isDeleting={isDeleting}
        onConfirmDeleteChat={handleConfirmDeleteChat}
      />
    </>
  );
};
