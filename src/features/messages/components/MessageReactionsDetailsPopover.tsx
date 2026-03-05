import type { RefObject } from "react";

import {
  ALL_REACTIONS_TAB,
  useMessageReactionsDetailsLogic,
} from "../hooks/ui/useMessageReactionsDetailsLogic";
import { MessageReactionsDetailsPopoverHeader } from "./MessageReactionsDetailsPopoverHeader";
import { MessageReactionsDetailsPopoverList } from "./MessageReactionsDetailsPopoverList";

type MessageReactionsDetailsPopoverProps = {
  popoverRef: RefObject<HTMLDivElement | null>;
  open: boolean;
  messageId: string;
  canReact: boolean;
  selectedEmoji: string | null;
  placement: "top" | "bottom";
  align: "left" | "right";
  onClose: () => void;
  onToggleReaction: (emoji: string) => void;
};

export const MessageReactionsDetailsPopover = ({
  popoverRef,
  open,
  messageId,
  canReact,
  selectedEmoji,
  placement,
  align,
  onClose,
  onToggleReaction,
}: MessageReactionsDetailsPopoverProps) => {
  if (!open) {
    return null;
  }

  const normalizedSelectedEmoji = selectedEmoji?.trim()
    ? selectedEmoji.trim()
    : ALL_REACTIONS_TAB;

  const positionClass = placement === "bottom" ? "top-12" : "bottom-12";
  const alignClass = align === "right" ? "right-0" : "left-0";

  return (
    <MessageReactionsDetailsPopoverContent
      key={`${messageId}:${normalizedSelectedEmoji}`}
      popoverRef={popoverRef}
      messageId={messageId}
      canReact={canReact}
      selectedEmoji={selectedEmoji}
      onClose={onClose}
      onToggleReaction={onToggleReaction}
      alignClass={alignClass}
      positionClass={positionClass}
    />
  );
};

type MessageReactionsDetailsPopoverContentProps = {
  popoverRef: RefObject<HTMLDivElement | null>;
  messageId: string;
  canReact: boolean;
  selectedEmoji: string | null;
  onClose: () => void;
  onToggleReaction: (emoji: string) => void;
  alignClass: string;
  positionClass: string;
};

const MessageReactionsDetailsPopoverContent = ({
  popoverRef,
  messageId,
  canReact,
  selectedEmoji,
  onClose,
  onToggleReaction,
  alignClass,
  positionClass,
}: MessageReactionsDetailsPopoverContentProps) => {
  const reactionsDetails = useMessageReactionsDetailsLogic({
    messageId,
    selectedEmoji,
  });

  return (
    <div
      ref={popoverRef}
      onPointerDown={(event) => {
        event.stopPropagation();
      }}
      className={`absolute ${alignClass} ${positionClass} z-50 w-88 max-w-[82vw] overflow-hidden rounded-2xl border border-gray-light bg-white shadow-xl`}
    >
      <MessageReactionsDetailsPopoverHeader
        activeTab={reactionsDetails.activeTab}
        onTabChange={reactionsDetails.setActiveTab}
        onTabHover={reactionsDetails.prefetchTab}
        allTabValue={ALL_REACTIONS_TAB}
        totalCount={reactionsDetails.totalCount}
        tabs={reactionsDetails.tabs}
        onClose={onClose}
      />

      <MessageReactionsDetailsPopoverList
        listContainerRef={reactionsDetails.listContainerRef}
        sentinelRef={reactionsDetails.sentinelRef}
        isLoading={reactionsDetails.isLoading}
        isError={reactionsDetails.isError}
        errorMessage={reactionsDetails.errorMessage}
        visibleItems={reactionsDetails.visibleItems}
        isFetchingNextPage={reactionsDetails.isFetchingNextPage}
        canReact={canReact}
        onToggleReaction={onToggleReaction}
        onRetry={() => {
          void reactionsDetails.refetch();
        }}
      />
    </div>
  );
};
