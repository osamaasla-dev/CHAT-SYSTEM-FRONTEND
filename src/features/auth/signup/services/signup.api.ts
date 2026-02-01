import { apiPost } from "@/shared/lib/api";
import type { SignupSchema } from "../schemas";

export const signupApi = async (payload: SignupSchema) =>
  await apiPost<SignupSchema>("/auth/signup", payload);
