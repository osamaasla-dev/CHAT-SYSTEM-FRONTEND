import { Avatar, UserNameBlock } from "@/features/profile";
import type { ContactItem } from "@/features/contacts";
import { ContactButton } from "@/features/contacts";
import { BlockButton } from "@/features/blocks";
import { useChatStore } from "@/features/app/stores/chat.store";

type ContactCardProps = {
  contact: ContactItem;
};

export const ContactCard = ({ contact }: ContactCardProps) => {
  const openChat = useChatStore((state) => state.openChat);

  const handleOpenChat = () => {
    openChat(contact.contactId);
  };

  return (
    <article className="rounded-xl p-3 transition hover:bg-secondary">
      <div className="flex flex-col gap-3 ">
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
          className="flex w-full items-start gap-3 cursor-pointer text-left"
        >
          <div className="relative">
            <Avatar avatarUrl={contact.avatarUrl} name={contact.name} />
          </div>

          <UserNameBlock name={contact.name} username={contact.username} />
        </div>

        <div className=" flex justify-center flex-wrap gap-2">
          <ContactButton contactId={contact.contactId} isInContacts={true} />

          <BlockButton
            blockedUserId={contact.contactId}
            isBlocked={Boolean(contact.blockedAt)}
          />
        </div>
      </div>
    </article>
  );
};
