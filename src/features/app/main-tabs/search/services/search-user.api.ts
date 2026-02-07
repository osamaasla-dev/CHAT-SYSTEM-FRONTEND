import { apiGet } from "@/shared/lib";
import type { SearchUsernameSchema } from "../schemas/search-user.schema";
import type { SearchUserResult } from "../types/search-user.types";

export const searchByUsernameApi = async ({
  username,
}: SearchUsernameSchema) => {
  const normalizedUsername = username.trim().toLowerCase();
  const response = await apiGet<SearchUserResult>(
    `/users/search?username=${encodeURIComponent(normalizedUsername)}`,
  );

  return response.data;
};
