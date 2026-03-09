import { ConfirmDialog } from "@/shared/components";
import { MuteChatNotificationsDialog } from "./MuteChatNotificationsDialog";

type ChatHeaderActionsDialogsProps = {
  chatId: string;
  isClearDialogOpen: boolean;
  setIsClearDialogOpen: (open: boolean) => void;
  isClearing: boolean;
  onConfirmClearChat: () => void;
  isMuteDialogOpen: boolean;
  setIsMuteDialogOpen: (open: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  isDeleting: boolean;
  onConfirmDeleteChat: () => Promise<void>;
};

export const ChatHeaderActionsDialogs = ({
  chatId,
  isClearDialogOpen,
  setIsClearDialogOpen,
  isClearing,
  onConfirmClearChat,
  isMuteDialogOpen,
  setIsMuteDialogOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  isDeleting,
  onConfirmDeleteChat,
}: ChatHeaderActionsDialogsProps) => {
  return (
    <>
      {chatId && (
        <ConfirmDialog
          title="Clear chat?"
          description="This will clear the messages in this chat for you."
          confirmLabel="Clear"
          confirmVariant="delete"
          isConfirming={isClearing}
          onConfirm={onConfirmClearChat}
          open={isClearDialogOpen}
          onOpenChange={setIsClearDialogOpen}
        />
      )}

      {chatId && (
        <MuteChatNotificationsDialog
          chatId={chatId}
          open={isMuteDialogOpen}
          onOpenChange={setIsMuteDialogOpen}
        />
      )}

      {chatId && (
        <ConfirmDialog
          title="Delete chat?"
          description="This will permanently delete this chat for you."
          confirmLabel="Delete"
          confirmVariant="delete"
          isConfirming={isDeleting}
          onConfirm={onConfirmDeleteChat}
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        />
      )}
    </>
  );
};
