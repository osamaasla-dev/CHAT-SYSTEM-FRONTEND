import { apiPost } from "@/shared/lib";

export const logoutApi = async () => await apiPost<void>("/auth/logout");
