import { useCallback, useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";
import { Smile } from "lucide-react";

const PICKER_ESTIMATED_HEIGHT = 200;

type PopoverPlacement = "top" | "bottom";

type EmojiPickerPopoverProps = {
  disabled?: boolean;
  openDirection?: "left" | "right";
  onEmojiSelect: (emoji: string) => void;
  onOpenChange?: (open: boolean) => void;
};

type EmojiSelectPayload = {
  native?: string;
};

export const EmojiPickerPopover = ({
  disabled = false,
  openDirection = "right",
  onEmojiSelect,
  onOpenChange,
}: EmojiPickerPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopoverPlacement>("top");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pickerContainerRef = useRef<HTMLDivElement | null>(null);

  const setPopoverOpen = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [onOpenChange],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const resolvePlacement = () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      const rect = root.getBoundingClientRect();
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      const requiredSpace = PICKER_ESTIMATED_HEIGHT;

      let nextPlacement: PopoverPlacement = "top";
      if (spaceBelow >= requiredSpace) {
        nextPlacement = "bottom";
      } else if (spaceAbove >= requiredSpace) {
        nextPlacement = "top";
      } else {
        nextPlacement = spaceBelow > spaceAbove ? "bottom" : "top";
      }

      setPlacement((current) =>
        current === nextPlacement ? current : nextPlacement,
      );
    };

    resolvePlacement();

    window.addEventListener("resize", resolvePlacement);
    window.addEventListener("scroll", resolvePlacement, true);

    return () => {
      window.removeEventListener("resize", resolvePlacement);
      window.removeEventListener("scroll", resolvePlacement, true);
    };
  }, [open]);

  useEffect(() => {
    const pickerContainer = pickerContainerRef.current;

    if (!open || !pickerContainer) {
      return;
    }

    const picker = new Picker({
      data,
      theme: "light",
      locale: "en",
      previewPosition: "none",
      onEmojiSelect: (payload: EmojiSelectPayload) => {
        if (!payload.native) {
          return;
        }

        onEmojiSelect(payload.native);
      },
    });

    const pickerElement = picker as unknown as HTMLElement;
    pickerContainer.replaceChildren(pickerElement);

    return () => {
      if (pickerElement.parentNode) {
        pickerElement.parentNode.removeChild(pickerElement);
      }
      pickerContainer.replaceChildren();
    };
  }, [onEmojiSelect, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      const eventPath =
        typeof event.composedPath === "function" ? event.composedPath() : [];

      if (
        (rootRef.current && eventPath.includes(rootRef.current)) ||
        rootRef.current?.contains(target)
      ) {
        return;
      }

      setPopoverOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPopoverOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, setPopoverOpen]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => {
          setPopoverOpen(!open);
        }}
        disabled={disabled}
        className="cursor-pointer inline-flex size-7 items-center justify-center rounded-full border border-gray-light bg-white text-muted-foreground hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Open emoji picker"
      >
        <Smile className="size-4" />
      </button>

      {open ? (
        <div
          className={`absolute z-50 overflow-hidden rounded-xl border border-gray-light bg-white shadow-lg ${
            openDirection === "left" ? "right-0" : "left-0"
          } ${placement === "bottom" ? "top-12" : "bottom-12"}`}
        >
          <div ref={pickerContainerRef} />
        </div>
      ) : null}
    </div>
  );
};
