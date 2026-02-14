import {
  notifyManager,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { resolveApiErrorMessage } from "@/shared/utils";
import { createBlockApi } from "../services/blocks.api";
import { BLOCKED_CONTACTS_QUERY_KEY } from "./useBlockedContacts";
import { BLOCKED_CONTACTS_COUNT_QUERY_KEY } from "./useBlockedContactsCount";
import { SEARCH_USER_QUERY_KEY } from "@/features/app/main-tabs/search";
import { updateBlockedContactInContactsCache } from "@/features/contacts";
import { blockEmitters } from "@/features/websocket/emitters/block";

export const CREATE_BLOCK_MUTATION_KEY = (blockedUserId: string) =>
  ["blocks", "create", blockedUserId] as const;

export function useCreateBlock(blockedUserId: string) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, void>({
    mutationKey: CREATE_BLOCK_MUTATION_KEY(blockedUserId),
    mutationFn: () => createBlockApi(blockedUserId),
    onSuccess: async () => {
      notifyManager.batch(() => {
        void queryClient.invalidateQueries({
          queryKey: BLOCKED_CONTACTS_QUERY_KEY,
        });
        void queryClient.invalidateQueries({
          queryKey: BLOCKED_CONTACTS_COUNT_QUERY_KEY,
        });
        void queryClient.invalidateQueries({
          queryKey: [SEARCH_USER_QUERY_KEY],
        });
      });

      updateBlockedContactInContactsCache(queryClient, blockedUserId);

      // Notify backend via WebSocket that this user has been blocked
      blockEmitters.blockUser(blockedUserId);
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(error.message);
      toast.error(message);
    },
  });
}
