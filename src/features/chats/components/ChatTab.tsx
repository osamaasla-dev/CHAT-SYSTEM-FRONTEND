import { MessageBubble, MessageDaySeparator } from "@/features/messages";
import { useChatTabLogic } from "../hooks/ui";
import { ChatHeader } from "./ChatHeader";
import { ChatComposer } from "./ChatComposer";

type ChatTabProps = {
  userId: string;
  onClose: () => void;
};

export const ChatTab = ({ userId, onClose }: ChatTabProps) => {
  const {
    privateChat,
    isChatLoading,
    presence,
    timelineItems,
    unreadBoundaryMessageId,
    isConversationBlocked,
    typingLabel,
    messagesContainerRef,
    sentinelRef,
    handleSendMessage,
  } = useChatTabLogic({ userId });

  if (!userId) return null;
  if (isChatLoading || !privateChat) return null;
  const otherUserName = privateChat.otherUser.name ?? "Chat";
  const otherUserAvatar = privateChat.otherUser.avatarUrl ?? null;
  console.log(unreadBoundaryMessageId);
  return (
    <div className="flex h-full w-full flex-col bg-linear-to-br from-light via-primary-light to-light">
      <ChatHeader
        name={otherUserName}
        avatarUrl={otherUserAvatar}
        presence={presence}
        chatId={privateChat.id}
        blockedUserId={privateChat.otherUser.id}
        isBlocked={privateChat.otherUser.isBlockedByMe}
        notificationsMuted={privateChat.notificationsMuted}
        typingLabel={typingLabel}
        onClose={onClose}
      />

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-3 py-2"
      >
        <div ref={sentinelRef} />
        <div className="flex flex-col gap-2">
          {timelineItems.map((item) => {
            if (item.type === "date") {
              return <MessageDaySeparator key={item.key} label={item.label} />;
            }

            const message = item.message;

            return (
              <div key={item.key}>
                {unreadBoundaryMessageId === message.id && (
                  <div className="my-2 flex items-center gap-2">
                    <div className="h-px flex-1 bg-light" />
                    <span className="rounded-full bg-light px-2 py-0.5 text-xs font-medium text-primary-dark">
                      Unread messages
                    </span>
                    <div className="h-px flex-1 bg-light" />
                  </div>
                )}
                <MessageBubble message={message} />
              </div>
            );
          })}
        </div>
      </div>

      {isConversationBlocked ? (
        <div className="border-t border-gray-light bg-danger/5 px-4 py-3 text-sm text-danger">
          You can not send messages in this chat because one of you blocked the
          other.
        </div>
      ) : (
        <ChatComposer chatId={privateChat.id} onSend={handleSendMessage} />
      )}
    </div>
  );
};
