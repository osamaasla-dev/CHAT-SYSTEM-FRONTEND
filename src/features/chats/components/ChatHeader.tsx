import type { UserPresence } from "@/features/app/stores/presence.store";
import { LastSeenLabel } from "@/shared/components";
import { Avatar } from "@/features/profile/components/Avatar";
import { ChatHeaderActions } from "./ChatHeaderActions";

type ChatHeaderProps = {
  name: string;
  avatarUrl: string | null;
  presence?: UserPresence;
  chatId: string;
  blockedUserId: string;
  isBlocked: boolean;
  notificationsMuted: boolean;
  typingLabel?: string;
  onClose: () => void;
};

export const ChatHeader = ({
  name,
  avatarUrl,
  presence,
  chatId,
  blockedUserId,
  isBlocked,
  notificationsMuted,
  typingLabel,
  onClose,
}: ChatHeaderProps) => {
  return (
    <header className="flex items-center justify-between bg-light px-4 py-3 border-b-2 border-gray-light">
      <div className="flex items-center gap-3">
        <Avatar avatarUrl={avatarUrl} name={name} />
        <div className="flex flex-col text-start ">
          <h2 className="font-semibold text-primary-dark">{name}</h2>
          {typingLabel ? (
            <p className="mt-0.5 text-xs text-primary">{typingLabel}</p>
          ) : (
            <LastSeenLabel
              presence={presence}
              className="mt-0.5 text-muted-foreground text-xs"
            />
          )}
        </div>
      </div>
      <ChatHeaderActions
        chatId={chatId}
        blockedUserId={blockedUserId}
        isBlocked={isBlocked}
        notificationsMuted={notificationsMuted}
        onClose={onClose}
      />
    </header>
  );
};
