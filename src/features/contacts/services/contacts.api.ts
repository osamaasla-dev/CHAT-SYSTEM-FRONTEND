import { apiDelete, apiGet, apiPost } from "@/shared/lib";

import type { ContactsQuerySchema } from "../schemas/contacts.schema";
import type { ContactsResponse } from "../types/contacts.types";

export const contactsApi = async (params: ContactsQuerySchema = {}) => {
  const searchParams = new URLSearchParams();

  if (params.limit) {
    searchParams.set("limit", params.limit.toString());
  }

  if (params.cursor) {
    searchParams.set("cursor", params.cursor);
  }

  const queryString = searchParams.toString();
  const response = await apiGet<ContactsResponse>(
    `/contacts${queryString ? `?${queryString}` : ""}`,
  );
  return response.data;
};

export const createContactApi = async (contactId: string) => {
  await apiPost<void>("/contacts", { contactId });
};

export const deleteContactApi = async (contactId: string) => {
  await apiDelete<void>(`/contacts/${contactId}`);
};
