import { useQuery } from "@tanstack/react-query";
import { blockedContactsCountApi } from "../services/blocks.api";

export const BLOCKED_CONTACTS_COUNT_QUERY_KEY = ["blocks", "count"] as const;

export const useBlockedContactsCount = () => {
  const query = useQuery({
    queryKey: BLOCKED_CONTACTS_COUNT_QUERY_KEY,
    queryFn: blockedContactsCountApi,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnReconnect: true,
  });

  return query;
};
