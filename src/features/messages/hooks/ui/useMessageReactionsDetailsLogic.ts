import { useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { getMessageReactionsApi } from "../../services/message.api";
import {
  MESSAGE_REACTIONS_QUERY_KEY,
  useMessageReactions,
} from "../useMessageReactions";
import type { MessageReactionDetailsItem, MessageReactionTabItem } from "../../types/message.types";

export const ALL_REACTIONS_TAB = "__ALL__";
const MESSAGE_REACTIONS_PREFETCH_LIMIT = 20;

type UseMessageReactionsDetailsLogicParams = {
  messageId: string;
  selectedEmoji: string | null;
};

export const useMessageReactionsDetailsLogic = ({
  messageId,
  selectedEmoji,
}: UseMessageReactionsDetailsLogicParams) => {
  const queryClient = useQueryClient();
  const normalizedSelectedEmoji =
    selectedEmoji?.trim() ? selectedEmoji.trim() : null;
  const initialTab = normalizedSelectedEmoji ?? ALL_REACTIONS_TAB;
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const selectedFilterEmoji =
    activeTab === ALL_REACTIONS_TAB ? null : activeTab;

  const reactionsQuery = useMessageReactions({
    messageId,
    emoji: selectedFilterEmoji,
    enabled: Boolean(messageId),
  });

  const firstPage = reactionsQuery.data?.pages[0];
  const tabs: MessageReactionTabItem[] = firstPage?.tabs.items ?? [];
  const totalCount = firstPage?.tabs.totalCount ?? 0;
  const myReaction = firstPage?.myReaction ?? null;

  const paginatedItems = useMemo(
    () => reactionsQuery.data?.pages.flatMap((page) => page.items) ?? [],
    [reactionsQuery.data],
  );

  const shouldPinMyReaction =
    Boolean(myReaction) &&
    (selectedFilterEmoji === null || myReaction?.emoji === selectedFilterEmoji);

  const visibleItems: MessageReactionDetailsItem[] = useMemo(() => {
    if (!myReaction || !shouldPinMyReaction) {
      return paginatedItems;
    }

    return [
      myReaction,
      ...paginatedItems.filter((item) => item.userId !== myReaction.userId),
    ];
  }, [myReaction, paginatedItems, shouldPinMyReaction]);

  useInfiniteScroll({
    sentinelRef,
    rootRef: listContainerRef,
    hasNextPage: Boolean(reactionsQuery.hasNextPage),
    isFetching: reactionsQuery.isFetchingNextPage,
    onLoadMore: () => {
      void reactionsQuery.fetchNextPage();
    },
    enabled: Boolean(reactionsQuery.hasNextPage),
    rootMargin: "120px 0px 120px 0px",
  });

  const prefetchTab = (tabValue: string) => {
    const normalizedTabValue = tabValue.trim();
    const nextEmojiFilter =
      normalizedTabValue === ALL_REACTIONS_TAB ? null : normalizedTabValue || null;

    if (!messageId || nextEmojiFilter === selectedFilterEmoji) {
      return;
    }

    const queryKey = MESSAGE_REACTIONS_QUERY_KEY(messageId, nextEmojiFilter);
    const existingState = queryClient.getQueryState(queryKey);
    if (existingState?.status === "success" || existingState?.fetchStatus === "fetching") {
      return;
    }

    void queryClient.prefetchInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) =>
        getMessageReactionsApi({
          messageId,
          limit: MESSAGE_REACTIONS_PREFETCH_LIMIT,
          cursor: typeof pageParam === "string" ? pageParam : undefined,
          emoji: nextEmojiFilter ?? undefined,
        }),
      initialPageParam: undefined,
    });
  };

  return {
    activeTab,
    setActiveTab,
    prefetchTab,
    tabs,
    totalCount,
    visibleItems,
    listContainerRef,
    sentinelRef,
    isLoading: reactionsQuery.isLoading,
    isError: reactionsQuery.isError,
    errorMessage: reactionsQuery.isError ? reactionsQuery.error.message : null,
    isFetchingNextPage: reactionsQuery.isFetchingNextPage,
    refetch: reactionsQuery.refetch,
  };
};
