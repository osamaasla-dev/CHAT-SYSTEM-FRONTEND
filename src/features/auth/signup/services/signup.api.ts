import { apiPost } from "@/shared/lib/api";
import type { SignupPayload } from "../schemas";

export const signupApi = async (payload: SignupPayload) =>
  await apiPost<SignupPayload>("/auth/signup", payload);
