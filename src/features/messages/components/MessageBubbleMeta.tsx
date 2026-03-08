import { Check, CheckCheck, Clock3 } from "lucide-react";

import type { MessageLocalState, MessageTick } from "../types/message.types";
import { formatMessageTime } from "../utils/message-day.utils";
import { isPendingMessageState } from "../utils/message-state.utils";

type MessageBubbleMetaProps = {
  isOwn: boolean;
  isDeleted: boolean;
  editedAt: string | null;
  createdAt: string;
  localState?: MessageLocalState;
  ticks: MessageTick;
};

export const MessageBubbleMeta = ({
  isOwn,
  isDeleted,
  editedAt,
  createdAt,
  localState,
  ticks,
}: MessageBubbleMetaProps) => {
  const tickClassName = ticks.isBlue ? "text-sky-500" : "text-muted-foreground";
  const isPending = isPendingMessageState(localState);

  return (
    <div className="flex items-center justify-end gap-1 text-[10px]">
      {!isDeleted && editedAt && <span className="text-muted-foreground">(Edited)</span>}
      <span className="text-muted-foreground">{formatMessageTime(createdAt)}</span>
      {isOwn && isPending && (
        <Clock3 className="size-3 text-muted-foreground" />
      )}
      {isOwn && !isPending &&
        (ticks.visibleTicks === 2 ? (
          <CheckCheck className={`size-3 ${tickClassName}`} />
        ) : (
          <Check className={`size-3 ${tickClassName}`} />
        ))}
    </div>
  );
};
