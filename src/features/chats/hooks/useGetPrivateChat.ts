import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { getPrivateChatApi } from "../services/chat.api";
import type { PrivateChatResponse } from "../types/chat.types";

export const GET_PRIVATE_CHAT_QUERY_KEY = (otherUserId: string) =>
  ["chats", "private", otherUserId] as const;

export function useGetPrivateChat(
  otherUserId: string,
): UseQueryResult<PrivateChatResponse, ApiErrorResponse> {
  return useQuery<PrivateChatResponse, ApiErrorResponse>({
    queryKey: GET_PRIVATE_CHAT_QUERY_KEY(otherUserId),
    queryFn: () => getPrivateChatApi(otherUserId),
    enabled: Boolean(otherUserId),
  });
}
