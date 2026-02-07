import { apiDelete, apiGet, apiPost } from "@/shared/lib";
import type { BlockedContactsQuerySchema } from "../schemas/blocked-contacts.schema";
import type { BlockedContactsResponse } from "../types/blocks.types";

export const blockedContactsCountApi = async () => {
  const response = await apiGet<{ count: number }>("/blocks/count");
  return response.data.count;
};

export const blockedContactsApi = async (
  params: BlockedContactsQuerySchema = {},
) => {
  const searchParams = new URLSearchParams();

  if (params.limit) {
    searchParams.set("limit", params.limit.toString());
  }

  if (params.cursor) {
    searchParams.set("cursor", params.cursor);
  }

  const queryString = searchParams.toString();
  const response = await apiGet<BlockedContactsResponse>(
    `/blocks${queryString ? `?${queryString}` : ""}`,
  );
  return response.data;
};

export const createBlockApi = async (blockedUserId: string) => {
  await apiPost<void>("/blocks", { blockedUserId });
};

export const deleteBlockApi = async (blockedUserId: string) => {
  await apiDelete<void>(`/blocks/${blockedUserId}`);
};
