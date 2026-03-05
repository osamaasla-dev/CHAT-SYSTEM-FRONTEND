import {
  ConfirmDialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

import { useMessageBubbleActionsLogic } from "../hooks/ui";

export type MessageBubbleActionsProps = {
  chatId: string;
  messageId: string;
  createdAt: string;
  contentType: "TEXT" | "IMAGE";
  isOwn: boolean;
  isDeleted: boolean;
  onEditRequested: () => void;
};

export const MessageBubbleActions = ({
  chatId,
  messageId,
  createdAt,
  contentType,
  isOwn,
  isDeleted,
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
  });

  if (!canDeleteMessage && !canEditMessage) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="cursor-pointer inline-flex h-6 w-3 items-center justify-center rounded-full text-muted-foreground hover:bg-primary-light/20"
            aria-label="Message actions"
          >
            <MoreVertical className="size-3.5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end" className="w-40">
          {canEditMessage ? (
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
                onEditRequested();
              }}
            >
              <div className="flex items-center gap-2">
                <Pencil className="size-4" />
                <span>Edit message</span>
              </div>
            </DropdownMenuItem>
          ) : null}

          {canDeleteMessage ? (
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
                setIsDeleteDialogOpen(true);
              }}
              className="hover:bg-danger/10 hover:text-danger"
            >
              <div className="flex items-center gap-2">
                <Trash2 className="size-4" />
                <span>Delete message</span>
              </div>
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        title="Delete message?"
        description="This message will be deleted for everyone."
        confirmLabel="Delete"
        confirmVariant="delete"
        isConfirming={isDeleting}
        onConfirm={handleConfirmDelete}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  );
};
