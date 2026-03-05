import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from "@/shared/components";
import { useMuteChatNotificationsDialogLogic } from "../hooks/ui";

export type MuteChatNotificationsDialogProps = {
  chatId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const MuteChatNotificationsDialog = ({
  chatId,
  open,
  onOpenChange,
}: MuteChatNotificationsDialogProps) => {
  const { selectedOption, setSelectedOption, isPending, handleConfirm } =
    useMuteChatNotificationsDialogLogic({
      chatId,
      onClose: () => onOpenChange(false),
    });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="md:max-w-md bg-light border-secondary"
        showCloseButton={!isPending}
      >
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Mute notifications
          </DialogTitle>
          <DialogDescription className="text-xs leading-relaxed">
            No one else in this chat will see that you muted it. You will still
            receive notifications when someone mentions you.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6 text-sm">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="mute-duration"
              className="size-4 cursor-pointer accent-primary"
              checked={selectedOption === "8h"}
              onChange={() => setSelectedOption("8h")}
            />
            <span>8 hours</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="mute-duration"
              className="size-4 cursor-pointer accent-primary"
              checked={selectedOption === "1w"}
              onChange={() => setSelectedOption("1w")}
            />
            <span>1 week</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="mute-duration"
              className="size-4 cursor-pointer accent-primary"
              checked={selectedOption === "forever"}
              onChange={() => setSelectedOption("forever")}
            />
            <span>Always</span>
          </label>
        </div>

        <DialogFooter className="mt-6 flex-row-reverse justify-between gap-3">
          <Button
            variant="submit"
            size="sm"
            disabled={isPending}
            onClick={handleConfirm}
          >
            {isPending ? "Saving..." : "Mute"}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
