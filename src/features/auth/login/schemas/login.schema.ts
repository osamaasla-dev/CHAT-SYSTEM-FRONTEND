import { z } from "zod";
import { emailSchema, passwordSchema } from "@/shared/schemas";
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;

export type LoginResponse = {
  mfa_required: boolean;
};
