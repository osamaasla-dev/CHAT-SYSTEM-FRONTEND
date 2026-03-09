import type { RefObject } from "react";
import { Loader2 } from "lucide-react";

import type { ChatListItem } from "@/features/chats";
import { ChatsListItem } from "./ChatListItem";

type ChatsListProps = {
  items: ChatListItem[];
  sentinelRef: RefObject<HTMLDivElement | null>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export const ChatsList = ({
  items,
  sentinelRef,
  hasNextPage,
  isFetchingNextPage,
}: ChatsListProps) => {
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <ChatsListItem key={item.id} chatItem={item} />
      ))}

      {hasNextPage && <div ref={sentinelRef} className="h-1 w-full" />}

      {isFetchingNextPage && (
        <div className="flex items-center justify-center py-3 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
        </div>
      )}
    </div>
  );
};
