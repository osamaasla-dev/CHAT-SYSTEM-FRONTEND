import { apiPost } from "@/shared/lib";

export const logoutAllApi = async () => await apiPost<void>("/auth/logout/all");
