import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { resolveApiErrorMessage } from "@/shared/utils";
import { toggleMessageReactionApi } from "../services/message.api";
import type {
  ChatMessagesResponse,
  ToggleMessageReactionResponse,
} from "../types/message.types";
import { toggleMessageReactionOptimisticallyInCache } from "../utils/message-reaction-cache.utils";
import { CHAT_MESSAGES_QUERY_KEY } from "./useChatMessages";
import { MESSAGE_REACTIONS_QUERY_PREFIX } from "./useMessageReactions";

export const TOGGLE_MESSAGE_REACTION_MUTATION_KEY = (chatId: string) =>
  ["messages", "reaction", chatId] as const;

type ToggleMessageReactionVariables = {
  messageId: string;
  emoji: string;
};

type ToggleMessageReactionContext = {
  previousData: InfiniteData<ChatMessagesResponse> | undefined;
};

export const useToggleMessageReaction = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    ToggleMessageReactionResponse,
    unknown,
    ToggleMessageReactionVariables,
    ToggleMessageReactionContext
  >({
    mutationKey: TOGGLE_MESSAGE_REACTION_MUTATION_KEY(chatId),
    mutationFn: ({ messageId, emoji }) =>
      toggleMessageReactionApi({ messageId, emoji }),
    onMutate: async (variables) => {
      const queryKey = CHAT_MESSAGES_QUERY_KEY(chatId);
      await queryClient.cancelQueries({ queryKey });

      const previousData =
        queryClient.getQueryData<InfiniteData<ChatMessagesResponse>>(queryKey);

      queryClient.setQueryData<InfiniteData<ChatMessagesResponse>>(
        queryKey,
        (current) =>
          toggleMessageReactionOptimisticallyInCache(current, variables),
      );

      return {
        previousData,
      };
    },

    onError: (error, _variables, context) => {
      queryClient.setQueryData<InfiniteData<ChatMessagesResponse>>(
        CHAT_MESSAGES_QUERY_KEY(chatId),
        context?.previousData,
      );

      const fallbackMessage =
        error instanceof Error ? error.message : "Failed to update reaction";
      toast.error(resolveApiErrorMessage(fallbackMessage));
    },
    onSettled: (_result, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: MESSAGE_REACTIONS_QUERY_PREFIX(variables.messageId),
      });
    },
  });
};
