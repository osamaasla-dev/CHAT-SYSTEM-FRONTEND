import { useEffect, useRef, useState } from "react";

import {
  MESSAGE_REACTIONS_POPOVER_ESTIMATED_HEIGHT,
  MESSAGE_REACTIONS_POPOVER_OFFSET,
} from "../../constants/message.constants";
import { useToggleMessageReaction } from "../useToggleMessageReaction";

export type MessageReactionsPopoverPlacement = "top" | "bottom";

type UseMessageBubbleReactionsLogicParams = {
  chatId: string;
  messageId: string;
  canReact: boolean;
};

export const useMessageBubbleReactionsLogic = ({
  chatId,
  messageId,
  canReact,
}: UseMessageBubbleReactionsLogicParams) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedDetailsEmoji, setSelectedDetailsEmoji] = useState<string | null>(
    null,
  );
  const [detailsPlacement, setDetailsPlacement] =
    useState<MessageReactionsPopoverPlacement>("top");

  const { mutate: toggleReaction } = useToggleMessageReaction(chatId);

  const handleToggleReaction = (emoji: string) => {
    const nextEmoji = emoji.trim();
    if (!canReact || !nextEmoji) {
      return;
    }

    toggleReaction({
      messageId,
      emoji: nextEmoji,
    });
  };

  const openDetailsPopover = (emoji?: string | null) => {
    const normalizedEmoji = emoji?.trim() ? emoji.trim() : null;
    setSelectedDetailsEmoji(normalizedEmoji);
    setIsDetailsOpen(true);
  };

  const closeDetailsPopover = () => {
    setIsDetailsOpen(false);
  };

  useEffect(() => {
    if (!isDetailsOpen) {
      return;
    }

    const resolvePlacement = () => {
      const root = anchorRef.current;
      if (!root) {
        return;
      }

      const rect = root.getBoundingClientRect();
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      const requiredSpace =
        MESSAGE_REACTIONS_POPOVER_ESTIMATED_HEIGHT +
        MESSAGE_REACTIONS_POPOVER_OFFSET;

      let nextPlacement: MessageReactionsPopoverPlacement = "top";
      if (spaceBelow >= requiredSpace) {
        nextPlacement = "bottom";
      } else if (spaceAbove >= requiredSpace) {
        nextPlacement = "top";
      } else {
        nextPlacement = spaceBelow > spaceAbove ? "bottom" : "top";
      }

      setDetailsPlacement((current) =>
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
  }, [isDetailsOpen]);

  useEffect(() => {
    if (!isDetailsOpen) {
      return;
    }

    const isEventInsideElement = (
      event: MouseEvent,
      element: HTMLElement | null,
    ): boolean => {
      const target = event.target;
      if (!(target instanceof Node) || !element) {
        return false;
      }

      const eventPath =
        typeof event.composedPath === "function" ? event.composedPath() : [];

      return eventPath.includes(element) || element.contains(target);
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (
        isEventInsideElement(event, anchorRef.current) ||
        isEventInsideElement(event, popoverRef.current)
      ) {
        return;
      }

      closeDetailsPopover();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDetailsPopover();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDetailsOpen]);

  return {
    anchorRef,
    popoverRef,
    isDetailsOpen,
    selectedDetailsEmoji,
    detailsPlacement,
    handleToggleReaction,
    openDetailsPopover,
    closeDetailsPopover,
  };
};
