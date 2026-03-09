import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components";
import {
  Bell,
  BellOff,
  Eraser,
  MoreVertical,
  ShieldBan,
  Trash2,
  X,
} from "lucide-react";

type ChatHeaderActionsMenuProps = {
  chatId: string;
  isUpdatingMute: boolean;
  isMuted: boolean;
  onCloseChat: () => void;
  onToggleMute: () => void;
  isBlockingMutating: boolean;
  blockLabel: string;
  onBlockClick: () => void;
  onOpenClearDialog: () => void;
  onOpenDeleteDialog: () => void;
};

export const ChatHeaderActionsMenu = ({
  chatId,
  isUpdatingMute,
  isMuted,
  onCloseChat,
  onToggleMute,
  isBlockingMutating,
  blockLabel,
  onBlockClick,
  onOpenClearDialog,
  onOpenDeleteDialog,
}: ChatHeaderActionsMenuProps) => {
  return (
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
            onCloseChat();
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
              onToggleMute();
            }}
          >
            <div className="flex items-center gap-2">
              {isMuted ? <BellOff className="size-4" /> : <Bell className="size-4" />}
              <span>{isMuted ? "Unmute notifications" : "Mute notifications"}</span>
            </div>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="bg-secondary" />

        <DropdownMenuItem
          disabled={isBlockingMutating}
          onSelect={(event) => {
            event.preventDefault();
            onBlockClick();
          }}
          className="hover:bg-danger/10 hover:text-danger"
        >
          <div className="flex items-center gap-2">
            <ShieldBan className="size-4" />
            <span>{blockLabel}</span>
          </div>
        </DropdownMenuItem>

        {chatId && (
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              onOpenClearDialog();
            }}
            className="hover:bg-danger/10 hover:text-danger"
          >
            <div className="flex items-center gap-2">
              <Eraser className="size-4" />
              <span>Clear chat</span>
            </div>
          </DropdownMenuItem>
        )}

        {chatId && (
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              onOpenDeleteDialog();
            }}
            className="hover:bg-danger/10 hover:text-danger"
          >
            <div className="flex items-center gap-2">
              <Trash2 className="size-4" />
              <span>Delete chat</span>
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
