import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { resolveApiErrorMessage } from "@/shared/utils";
import { deleteContactApi } from "../services/contacts.api";
import { SEARCH_USER_QUERY_KEY } from "@/features/app/main-tabs/search";
import { removeContactFromContactsCache } from "../utils/update-cache.utils";

export const DELETE_CONTACT_MUTATION_KEY = (contactId: string) =>
  ["contacts", "delete", contactId] as const;

export function useDeleteContact(contactId: string) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, void>({
    mutationKey: DELETE_CONTACT_MUTATION_KEY(contactId),
    mutationFn: () => deleteContactApi(contactId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [SEARCH_USER_QUERY_KEY],
      });
      removeContactFromContactsCache(queryClient, contactId);
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(error.message);
      toast.error(message);
    },
  });
}
