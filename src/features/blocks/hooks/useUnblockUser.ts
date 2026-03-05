import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { resolveApiErrorMessage } from "@/shared/utils";
import { deleteBlockApi } from "../services/blocks.api";
import { BLOCKED_CONTACTS_QUERY_KEY } from "./useBlockedContacts";
import { BLOCKED_CONTACTS_COUNT_QUERY_KEY } from "./useBlockedContactsCount";
import { SEARCH_USER_QUERY_KEY } from "@/features/app/main-tabs/search";
import { updateBlockedContactsCacheAfterUnblock } from "../utils/update-cache.utils";
import { blockEmitters } from "@/features/websocket/emitters/block";
import { GET_PRIVATE_CHAT_QUERY_KEY } from "@/features/chats/hooks/useGetPrivateChat";
import { useChatStore } from "@/features/app/stores/chat.store";

export const UNBLOCK_USER_MUTATION_KEY = (blockedUserId: string) =>
  ["blocks", "unblock", blockedUserId] as const;

export function useUnblockUser(blockedUserId: string) {
  const queryClient = useQueryClient();
  const setUserBlocked = useChatStore((state) => state.setUserBlocked);

  return useMutation<void, ApiErrorResponse, void>({
    mutationKey: UNBLOCK_USER_MUTATION_KEY(blockedUserId),
    mutationFn: () => deleteBlockApi(blockedUserId),

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [SEARCH_USER_QUERY_KEY],
      });
      await queryClient.cancelQueries({ queryKey: BLOCKED_CONTACTS_QUERY_KEY });
      await queryClient.cancelQueries({
        queryKey: BLOCKED_CONTACTS_COUNT_QUERY_KEY,
      });

      const previousCount = queryClient.getQueryData<number>(
        BLOCKED_CONTACTS_COUNT_QUERY_KEY,
      );

      updateBlockedContactsCacheAfterUnblock(queryClient, blockedUserId);

      if (typeof previousCount === "number") {
        queryClient.setQueryData(
          BLOCKED_CONTACTS_COUNT_QUERY_KEY,
          Math.max(0, previousCount - 1),
        );
      }

      void queryClient.invalidateQueries({
        queryKey: GET_PRIVATE_CHAT_QUERY_KEY(blockedUserId),
      });
      setUserBlocked(blockedUserId, false);

      // Notify backend via WebSocket that this user has been unblocked
      blockEmitters.unblockUser(blockedUserId);
    },

    onError: (error) => {
      const message = resolveApiErrorMessage(error.message);
      toast.error(message);
    },
  });
}
