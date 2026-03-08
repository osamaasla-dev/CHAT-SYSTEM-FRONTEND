import { useMessageBubbleReactionsLogic } from "../hooks/ui";
import type { MessageReactionItem } from "../types/message.types";
import { MessageReactionsDetailsPopover } from "./MessageReactionsDetailsPopover";

type MessageBubbleReactionsProps = {
  chatId: string;
  messageId: string;
  reactions: MessageReactionItem[];
  canReact: boolean;
  isOwn: boolean;
};

export const MessageBubbleReactions = ({
  chatId,
  messageId,
  reactions,
  canReact,
  isOwn,
}: MessageBubbleReactionsProps) => {
  const {
    anchorRef,
    popoverRef,
    isDetailsOpen,
    selectedDetailsEmoji,
    detailsPlacement,
    handleToggleReaction,
    openDetailsPopover,
    closeDetailsPopover,
  } = useMessageBubbleReactionsLogic({
    chatId,
    messageId,
    canReact,
  });

  const totalReactionsCount = reactions.reduce(
    (sum, reaction) => sum + reaction.count,
    0,
  );
  const hasReactions = reactions.length > 0;
  const displayedEmojis = reactions
    .slice(0, 4)
    .map((reaction) => reaction.emoji);
  const hasMoreEmojis = reactions.length > displayedEmojis.length;
  const reactedByMe = reactions.some((reaction) => reaction.reactedByMe);

  if (!hasReactions) {
    return null;
  }

  return (
    <div
      ref={anchorRef}
      className={`relative flex flex-wrap items-center ${
        hasReactions ? "-mb-2 mt-0.5" : "mt-1"
      }`}
    >
      {hasReactions && (
        <button
          type="button"
          onClick={() => {
            openDetailsPopover(null);
          }}
          className={`inline-flex translate-y-1/2 cursor-pointer items-center gap-1 rounded-full border px-2 py-0.5 text-xs shadow-sm transition ${
            reactedByMe
              ? "border-primary bg-white text-primary-dark"
              : "border-gray-light bg-white text-primary-dark"
          }`}
        >
          <span className="font-medium">{totalReactionsCount}</span>
          <span className="flex items-center gap-0.5">
            {displayedEmojis.map((emoji, index) => (
              <span key={`${emoji}-${index}`}>{emoji}</span>
            ))}
            {hasMoreEmojis && (
              <span className="text-[11px] text-muted-foreground">...</span>
            )}
          </span>
        </button>
      )}

      <MessageReactionsDetailsPopover
        popoverRef={popoverRef}
        open={isDetailsOpen}
        messageId={messageId}
        canReact={canReact}
        selectedEmoji={selectedDetailsEmoji}
        placement={detailsPlacement}
        align={isOwn ? "left" : "right"}
        onClose={closeDetailsPopover}
        onToggleReaction={handleToggleReaction}
      />
    </div>
  );
};
