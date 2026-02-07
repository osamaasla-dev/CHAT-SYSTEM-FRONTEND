import { Avatar, UserNameBlock } from "@/features/profile";
import type { ContactItem } from "@/features/contacts";
import { ContactButton } from "@/features/contacts";
import { BlockButton } from "@/features/blocks";

type ContactCardProps = {
  contact: ContactItem;
};

export const ContactCard = ({ contact }: ContactCardProps) => {
  return (
    <article className="cursor-pointer rounded-xl p-3 transition hover:bg-secondary">
      <div className="flex flex-col gap-3 ">
        <div className="flex gap-3">
          <Avatar avatarUrl={contact.avatarUrl} name={contact.name} />

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
