import { ConfirmDialog } from "@/shared/components";

type MessageBubbleDeleteDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isDeleting: boolean;
  onConfirmDelete: () => void;
};

export const MessageBubbleDeleteDialog = ({
  isOpen,
  onOpenChange,
  isDeleting,
  onConfirmDelete,
}: MessageBubbleDeleteDialogProps) => {
  return (
    <ConfirmDialog
      title="Delete message?"
      description="This message will be deleted for everyone."
      confirmLabel="Delete"
      confirmVariant="delete"
      isConfirming={isDeleting}
      onConfirm={onConfirmDelete}
      open={isOpen}
      onOpenChange={onOpenChange}
    />
  );
};
