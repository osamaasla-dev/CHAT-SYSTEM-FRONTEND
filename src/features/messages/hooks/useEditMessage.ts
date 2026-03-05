import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { resolveApiErrorMessage } from "@/shared/utils";
import { editMessageApi } from "../services/message.api";
import type { ChatMessagesResponse, EditMessageResponse } from "../types/message.types";
import { applyMessageEditedInCache } from "../utils/edit-message-cache.utils";
import { CHAT_MESSAGES_QUERY_KEY } from "./useChatMessages";

export const EDIT_MESSAGE_MUTATION_KEY = (chatId: string) =>
  ["messages", "edit", chatId] as const;

export const useEditMessage = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    EditMessageResponse,
    Error,
    {
      messageId: string;
      content: string;
    }
  >({
    mutationKey: EDIT_MESSAGE_MUTATION_KEY(chatId),
    mutationFn: async ({ messageId, content }) => editMessageApi({ messageId, content }),
    onSuccess: (result) => {
      queryClient.setQueryData<InfiniteData<ChatMessagesResponse>>(
        CHAT_MESSAGES_QUERY_KEY(result.chatId),
        (current) => applyMessageEditedInCache(current, result),
      );
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(error.message);
      toast.error(message);
    },
  });
};
