import { X } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { cn } from "@/shared/utils";

type ButtonVariant = React.ComponentProps<typeof Button>["variant"];

export type ConfirmDialogProps = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: ButtonVariant;
  isConfirming?: boolean;
  onConfirm: () => void | Promise<void>;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  className?: string;
  testId?: string;
};

export function ConfirmDialog({
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "delete",
  isConfirming = false,
  onConfirm,
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  className,
  testId = "confirm-dialog",
}: ConfirmDialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : internalOpen;

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const handleConfirmClick = useCallback(async () => {
    if (isConfirming) return;
    await onConfirm();
    handleOpenChange(false);
  }, [handleOpenChange, isConfirming, onConfirm]);

  return (
    <Dialog open={resolvedOpen} onOpenChange={handleOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}

      <DialogContent
        className={cn(
          "border border-secondary bg-white p-5 shadow-lg sm:max-w-sm",
          className,
        )}
        showCloseButton={false}
        data-testid={testId}
      >
        <div className="flex items-start justify-between gap-4">
          <DialogHeader className="space-y-1 text-left">
            <DialogTitle className="text-base font-semibold text-foreground">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-sm text-muted-foreground">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>

          <DialogClose
            className={cn(
              "rounded-full p-1 text-muted-foreground transition",
              isConfirming
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:bg-secondary hover:text-foreground",
            )}
            data-testid={`${testId}-close`}
            disabled={isConfirming}
          >
            <X className="size-4" />
          </DialogClose>
        </div>

        <div className="mt-6 flex flex-row-reverse flex-wrap gap-3">
          <Button
            variant={confirmVariant}
            onClick={handleConfirmClick}
            disabled={isConfirming}
            data-testid={`${testId}-confirm`}
          >
            {isConfirming ? "Processing..." : confirmLabel}
          </Button>

          <DialogClose asChild>
            <Button
              variant="secondary"
              disabled={isConfirming}
              data-testid={`${testId}-cancel`}
            >
              {cancelLabel}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
