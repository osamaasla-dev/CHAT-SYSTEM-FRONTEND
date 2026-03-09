import { Avatar, UserNameBlock } from "@/features/profile";
import { BlockButton } from "@/features/blocks";
import { ContactButton } from "@/features/contacts";
import type { SearchUserResult } from "../types/search-user.types";

type SearchResultCardProps = {
  user: SearchUserResult["user"];
  isInMyContacts: boolean;
  isBlockedByMe: boolean;
  onOpenChat: () => void;
};

export const SearchResultCard = ({
  user,
  isInMyContacts,
  isBlockedByMe,
  onOpenChat,
}: SearchResultCardProps) => {
  return (
    <article className="rounded-xl p-3 transition hover:bg-secondary">
      <div className="flex flex-col gap-3">
        <div
          role="button"
          tabIndex={0}
          onClick={onOpenChat}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onOpenChat();
            }
          }}
          className="flex w-full cursor-pointer items-start gap-3 text-left"
        >
          <Avatar avatarUrl={user.avatarUrl} name={user.name} />
          <UserNameBlock name={user.name} username={user.username} />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <ContactButton contactId={user.id} isInContacts={isInMyContacts} />
          <BlockButton blockedUserId={user.id} isBlocked={isBlockedByMe} />
        </div>
      </div>
    </article>
  );
};

