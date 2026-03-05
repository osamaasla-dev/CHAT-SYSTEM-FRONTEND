import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { userStatusApi } from "../services/chat.api";
import type { UserState } from "../types/chat.types";

export const USER_STATUS_QUERY_KEY = ["chat", "user-status"] as const;

const userStatusQueryKey = (userId: string) =>
  [...USER_STATUS_QUERY_KEY, userId] as const;

export const useUserStatus = (userId: string) => {
  return useQuery<UserState | null, ApiErrorResponse>({
    queryKey: userStatusQueryKey(userId),
    queryFn: () => userStatusApi(userId),
    enabled: Boolean(userId),
    staleTime: 0,
    gcTime: 0,
    refetchOnReconnect: true,
  });
};
