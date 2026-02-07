import { useQuery } from "@tanstack/react-query";
import type { ApiErrorResponse } from "@/shared/lib/api";
import type { SearchUsernameSchema } from "../schemas/search-user.schema";
import { searchByUsernameApi } from "../services/search-user.api";
import type { SearchUserResult } from "../types/search-user.types";

export const SEARCH_USER_QUERY_KEY = "search-user" as const;

export const SearchUserQueryKey = (username: string) =>
  [SEARCH_USER_QUERY_KEY, username] as const;

export const useSearchUser = (
  username: SearchUsernameSchema["username"],
  enabled = true,
) => {
  const normalizedUsername = username.trim().toLowerCase();

  return useQuery<SearchUserResult, ApiErrorResponse>({
    queryKey: SearchUserQueryKey(normalizedUsername),
    queryFn: () => searchByUsernameApi({ username: normalizedUsername }),
    enabled: enabled,
    staleTime: 0,
    gcTime: 0,
    retry: (failureCount, error) => {
      if (error.statusCode === 400) return false;
      return failureCount < 3;
    },
  });
};
