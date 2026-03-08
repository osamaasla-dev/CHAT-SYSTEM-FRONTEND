import { Check, CheckCheck } from "lucide-react";

import { useChatStore } from "@/features/app/stores/chat.store";
import type { ChatListItem } from "@/features/chats";
import { Avatar } from "@/features/profile";
import {
  formatChatLastMessageTime,
  getChatLastMessagePreview,
} from "../utils/chat-list.utils";

type ChatsListItemProps = {
  chatItem: ChatListItem;
};

export const ChatsListItem = ({ chatItem }: ChatsListItemProps) => {
  const openChat = useChatStore((state) => state.openChat);
  const { text: previewText, isOwnLastMessage } = getChatLastMessagePreview(chatItem);
  const messageTime = formatChatLastMessageTime(chatItem.lastMessage?.createdAt ?? null);
  const lastMessageTicks = chatItem.lastMessage?.ticks;

  return (
    <button
      type="button"
      onClick={() => {
        openChat(chatItem.otherUser.id);
      }}
      className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-secondary"
    >
      <Avatar avatarUrl={chatItem.otherUser.avatarUrl} name={chatItem.otherUser.name} />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-sm font-semibold text-primary-dark">
            {chatItem.otherUser.name}
          </p>
          {messageTime ? (
            <span className="shrink-0 text-[11px] text-muted-foreground">
              {messageTime}
            </span>
          ) : null}
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="flex min-w-0 items-center gap-1 truncate text-sm text-muted-foreground">
            {isOwnLastMessage && lastMessageTicks ? (
              lastMessageTicks.visibleTicks === 2 ? (
                <CheckCheck
                  className={`size-3 shrink-0 ${
                    lastMessageTicks.isBlue ? "text-sky-500" : "text-muted-foreground"
                  }`}
                />
              ) : (
                <Check className="size-3 shrink-0 text-muted-foreground" />
              )
            ) : null}
            <span className="truncate">{previewText}</span>
          </p>

          {chatItem.unreadCount > 0 ? (
            <span className="inline-flex min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[11px] font-semibold text-white">
              {chatItem.unreadCount > 99 ? "99+" : chatItem.unreadCount}
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
};
