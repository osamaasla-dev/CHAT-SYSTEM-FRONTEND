import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

type MessageBubbleActionsMenuProps = {
  canEditMessage: boolean;
  canDeleteMessage: boolean;
  onEditRequested: () => void;
  onOpenDeleteDialog: () => void;
};

export const MessageBubbleActionsMenu = ({
  canEditMessage,
  canDeleteMessage,
  onEditRequested,
  onOpenDeleteDialog,
}: MessageBubbleActionsMenuProps) => {
  return (
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
        {canEditMessage && (
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
        )}

        {canDeleteMessage && (
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              onOpenDeleteDialog();
            }}
            className="hover:bg-danger/10 hover:text-danger"
          >
            <div className="flex items-center gap-2">
              <Trash2 className="size-4" />
              <span>Delete message</span>
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
