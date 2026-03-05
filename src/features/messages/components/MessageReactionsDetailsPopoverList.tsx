import type { RefObject } from "react";
import { Loader2 } from "lucide-react";

import { resolveApiErrorMessage } from "@/shared/utils";
import type { MessageReactionDetailsItem } from "../types/message.types";
import { MessageReactionsDetailsPopoverItemRow } from "./MessageReactionsDetailsPopoverItemRow";

type MessageReactionsDetailsPopoverListProps = {
  listContainerRef: RefObject<HTMLDivElement | null>;
  sentinelRef: RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | string[] | null;
  visibleItems: MessageReactionDetailsItem[];
  isFetchingNextPage: boolean;
  canReact: boolean;
  onToggleReaction: (emoji: string) => void;
  onRetry: () => void;
};

export const MessageReactionsDetailsPopoverList = ({
  listContainerRef,
  sentinelRef,
  isLoading,
  isError,
  errorMessage,
  visibleItems,
  isFetchingNextPage,
  canReact,
  onToggleReaction,
  onRetry,
}: MessageReactionsDetailsPopoverListProps) => {
  return (
    <div ref={listContainerRef} className="max-h-72 overflow-y-auto">
      {isLoading ? (
        <div className="flex items-center justify-center p-4 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
        </div>
      ) : isError ? (
        <div className="space-y-2 p-4 text-sm text-danger">
          <p>
            {resolveApiErrorMessage(errorMessage ?? "Failed to load reactions")}
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="cursor-pointer rounded-md border border-danger/30 px-2 py-1 text-xs text-danger transition hover:bg-danger/5"
          >
            Retry
          </button>
        </div>
      ) : visibleItems.length === 0 ? (
        <p className="p-4 text-sm text-muted-foreground">No reactions yet</p>
      ) : (
        <div className="py-1">
          {visibleItems.map((item) => (
            <MessageReactionsDetailsPopoverItemRow
              key={item.reactionId}
              item={item}
              canReact={canReact}
              onToggleReaction={onToggleReaction}
            />
          ))}

          <div ref={sentinelRef} />
          {isFetchingNextPage && (
            <div className="flex items-center justify-center py-2 text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
