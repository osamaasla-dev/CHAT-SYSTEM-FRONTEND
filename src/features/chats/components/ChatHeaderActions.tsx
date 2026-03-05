import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  ConfirmDialog,
} from "@/shared/components";
import {
  MoreVertical,
  X,
  Bell,
  BellOff,
  ShieldBan,
  Eraser,
  Trash2,
} from "lucide-react";
import { MuteChatNotificationsDialog } from "./MuteChatNotificationsDialog";
import { useChatHeaderActionsLogic } from "../hooks/ui";

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary-light/40 text-muted-foreground hover:bg-primary-light/15 cursor-pointer"
            aria-label="Chat actions"
          >
            <MoreVertical className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end" className="w-45">
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              handleCloseChat();
            }}
          >
            <div className="flex items-center gap-2">
              <X className="size-4" />
              <span>Close chat</span>
            </div>
          </DropdownMenuItem>
          {chatId && (
            <DropdownMenuItem
              disabled={isUpdatingMute}
              onSelect={(event) => {
                event.preventDefault();
                handleToggleMute();
              }}
            >
              <div className="flex items-center gap-2">
                {isMuted ? (
                  <BellOff className="size-4" />
                ) : (
                  <Bell className="size-4" />
                )}
                <span>
                  {isMuted ? "Unmute notifications" : "Mute notifications"}
                </span>
              </div>
            </DropdownMenuItem>
          )}
          {/* Separator between mute and negative actions */}
          <DropdownMenuSeparator className="bg-secondary" />

          {/* Negative actions: Block, Clear, Delete */}
          <DropdownMenuItem
            disabled={isBlockingMutating}
            onSelect={(event) => {
              event.preventDefault();
              handleBlockClick();
            }}
            className=" hover:bg-danger/10 hover:text-danger"
          >
            <div className="flex items-center gap-2">
              <ShieldBan className="size-4  hover:bg-danger/10 hover:text-danger" />
              <span>{blockLabel}</span>
            </div>
          </DropdownMenuItem>
          {chatId && (
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
                setIsClearDialogOpen(true);
              }}
              className=" hover:bg-danger/10 hover:text-danger"
            >
              <div className="flex items-center gap-2">
                <Eraser className="size-4  hover:bg-danger/10 hover:text-danger" />
                <span>Clear chat</span>
              </div>
            </DropdownMenuItem>
          )}
          {chatId && (
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
                setIsDeleteDialogOpen(true);
              }}
              className=" hover:bg-danger/10 hover:text-danger"
            >
              <div className="flex items-center gap-2">
                <Trash2 className="size-4  hover:bg-danger/10 hover:text-danger" />
                <span>Delete chat</span>
              </div>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {chatId && (
        <ConfirmDialog
          title="Clear chat?"
          description="This will clear the messages in this chat for you."
          confirmLabel="Clear"
          confirmVariant="delete"
          isConfirming={isClearing}
          onConfirm={handleConfirmClearChat}
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
          onConfirm={handleConfirmDeleteChat}
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        />
      )}
    </>
  );
};
