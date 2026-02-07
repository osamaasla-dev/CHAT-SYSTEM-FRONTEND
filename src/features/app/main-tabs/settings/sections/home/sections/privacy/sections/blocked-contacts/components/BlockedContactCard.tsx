import { BlockButton, type BlockedContactItem } from "@/features/blocks";
import { Avatar, UserNameBlock } from "@/features/profile";

type BlockedContactCardProps = {
  contact: BlockedContactItem;
};

export const BlockedContactCard = ({ contact }: BlockedContactCardProps) => {
  return (
    <article className="cursor-pointer rounded-xl p-3 transition hover:bg-secondary">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Avatar avatarUrl={contact.avatarUrl} name={contact.name} />

        <UserNameBlock name={contact.name} username={contact.username} />

        <BlockButton blockedUserId={contact.blockedUserId} isBlocked={true} />
      </div>
    </article>
  );
};
