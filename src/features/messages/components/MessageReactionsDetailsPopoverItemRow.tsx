import { Avatar } from "@/features/profile/components/Avatar";
import type { MessageReactionDetailsItem } from "../types/message.types";

type MessageReactionsDetailsPopoverItemRowProps = {
  item: MessageReactionDetailsItem;
  canReact: boolean;
  onToggleReaction: (emoji: string) => void;
};

export const MessageReactionsDetailsPopoverItemRow = ({
  item,
  canReact,
  onToggleReaction,
}: MessageReactionsDetailsPopoverItemRowProps) => {
  const canRemoveMyReaction = item.isMe && canReact;
  const rowClassName =
    "flex w-full items-center justify-between gap-3 px-3 py-2 text-start transition hover:bg-secondary/70";

  const rowContent = (
    <>
      <div className="flex min-w-0 items-center gap-2">
        <Avatar
          avatarUrl={item.avatarUrl}
          name={item.name}
          classNameImg="size-8"
          classNameIcon="size-6"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-primary-dark">
            {item.isMe ? "You" : item.name}
          </p>
          {canRemoveMyReaction && (
            <p className="text-xs text-muted-foreground">Tap to remove</p>
          )}
        </div>
      </div>
      <span className="text-lg leading-none">{item.emoji}</span>
    </>
  );

  if (!canRemoveMyReaction) {
    return <div className={rowClassName}>{rowContent}</div>;
  }

  return (
    <button
      type="button"
      onClick={() => {
        onToggleReaction(item.emoji);
      }}
      className={rowClassName}
    >
      {rowContent}
    </button>
  );
};
