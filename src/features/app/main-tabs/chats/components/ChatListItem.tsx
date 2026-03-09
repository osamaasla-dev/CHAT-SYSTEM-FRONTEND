import { useChatStore } from "@/features/app/stores/chat.store";
import type { ChatListItem } from "@/features/chats";
import { Avatar } from "@/features/profile";
import {
  formatChatLastMessageTime,
  getChatLastMessagePreview,
} from "../utils/chat-list.utils";
import { ChatListItemMeta } from "./ChatListItemMeta";
import { ChatListItemPreview } from "./ChatListItemPreview";

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
        <ChatListItemMeta name={chatItem.otherUser.name} messageTime={messageTime} />
        <ChatListItemPreview
          previewText={previewText}
          isOwnLastMessage={isOwnLastMessage}
          lastMessageTicks={lastMessageTicks}
          unreadCount={chatItem.unreadCount}
        />
      </div>
    </button>
  );
};
