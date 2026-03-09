import { Check, CheckCheck } from "lucide-react";

import type { MessageTick } from "@/features/messages";

type ChatListItemPreviewProps = {
  previewText: string;
  isOwnLastMessage: boolean;
  lastMessageTicks?: MessageTick | null;
  unreadCount: number;
};

const ChatListItemUnreadBadge = ({ unreadCount }: { unreadCount: number }) => {
  if (unreadCount <= 0) {
    return null;
  }

  return (
    <span className="inline-flex min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[11px] font-semibold text-white">
      {unreadCount > 99 ? "99+" : unreadCount}
    </span>
  );
};

const ChatListItemTick = ({
  isOwnLastMessage,
  lastMessageTicks,
}: {
  isOwnLastMessage: boolean;
  lastMessageTicks?: MessageTick | null;
}) => {
  if (!isOwnLastMessage || !lastMessageTicks) {
    return null;
  }

  if (lastMessageTicks.visibleTicks === 2) {
    return (
      <CheckCheck
        className={`size-3 shrink-0 ${
          lastMessageTicks.isBlue ? "text-sky-500" : "text-muted-foreground"
        }`}
      />
    );
  }

  return <Check className="size-3 shrink-0 text-muted-foreground" />;
};

export const ChatListItemPreview = ({
  previewText,
  isOwnLastMessage,
  lastMessageTicks,
  unreadCount,
}: ChatListItemPreviewProps) => {
  return (
    <div className="mt-1 flex items-center justify-between gap-2">
      <p className="flex min-w-0 items-center gap-1 truncate text-sm text-muted-foreground">
        <ChatListItemTick
          isOwnLastMessage={isOwnLastMessage}
          lastMessageTicks={lastMessageTicks}
        />
        <span className="truncate">{previewText}</span>
      </p>

      <ChatListItemUnreadBadge unreadCount={unreadCount} />
    </div>
  );
};

