import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { blockedContactsQueryOptions } from "./useBlockedContacts";
import type { BlockedContactsQuerySchema } from "../schemas/blocked-contacts.schema";

export const usePrefetchBlockedContacts = (
  limit: BlockedContactsQuerySchema["limit"] = 20,
) => {
  const queryClient = useQueryClient();

  return useCallback(() => {
    const options = blockedContactsQueryOptions(limit);
    queryClient.prefetchInfiniteQuery(options);
  }, [limit, queryClient]);
};
