import type { MainTabKey } from "@/features/app/types/main-tabs.types";
import { useChatStore } from "@/features/app/stores/chat.store";
import { Placeholder } from "../placeholders";
import { ChatTab } from "@/features/chat";

type MainSectionProps = {
  tab: MainTabKey;
  className?: string;
};

export const MainSection = ({ tab, className }: MainSectionProps) => {
  const selectedUserId = useChatStore((state) => state.selectedUserId);
  const closeChat = useChatStore((state) => state.closeChat);

  return (
    <section
      className={`flex flex-col justify-center items-center bg-secondary  text-center text-primary-dark ${className}`}
    >
      {selectedUserId ? (
        <ChatTab userId={selectedUserId} onClose={closeChat} />
      ) : (
        <Placeholder tab={tab} />
      )}
    </section>
  );
};
