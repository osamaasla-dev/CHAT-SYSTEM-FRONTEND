import { BlockButton, type BlockedContactItem } from "@/features/blocks";
import { Avatar, UserNameBlock } from "@/features/profile";
import { useChatStore } from "@/features/app/stores/chat.store";

type BlockedContactCardProps = {
  contact: BlockedContactItem;
};

export const BlockedContactCard = ({ contact }: BlockedContactCardProps) => {
  const openChat = useChatStore((state) => state.openChat);

  const handleOpenChat = () => {
    openChat(contact.blockedUserId);
  };

  return (
    <article className="rounded-xl p-3 transition hover:bg-secondary">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div
          role="button"
          tabIndex={0}
          onClick={handleOpenChat}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleOpenChat();
            }
          }}
          className="flex flex-1 items-center gap-3 cursor-pointer text-left"
        >
          <Avatar avatarUrl={contact.avatarUrl} name={contact.name} />

          <UserNameBlock name={contact.name} username={contact.username} />
        </div>

        <BlockButton blockedUserId={contact.blockedUserId} isBlocked={true} />
      </div>
    </article>
  );
};
