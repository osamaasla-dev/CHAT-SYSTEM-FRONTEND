import {
  notifyManager,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse } from "@/shared/lib/api";
import { resolveApiErrorMessage } from "@/shared/utils";
import { createContactApi } from "../services/contacts.api";
import { SEARCH_USER_QUERY_KEY } from "@/features/app/main-tabs/search";
import { CONTACTS_QUERY_KEY } from "./useContacts";

export const CREATE_CONTACT_MUTATION_KEY = (contactId: string) =>
  ["contacts", "create", contactId] as const;

export function useCreateContact(contactId: string) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, void>({
    mutationKey: CREATE_CONTACT_MUTATION_KEY(contactId),
    mutationFn: () => createContactApi(contactId),
    onSuccess: async () => {
      notifyManager.batch(() => {
        void queryClient.invalidateQueries({
          queryKey: [SEARCH_USER_QUERY_KEY],
        });
        void queryClient.invalidateQueries({
          queryKey: CONTACTS_QUERY_KEY,
        });
      });
    },
    onError: (error) => {
      const message = resolveApiErrorMessage(error.message);
      toast.error(message);
    },
  });
}
