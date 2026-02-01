import { z } from "zod";
import { emailSchema, nameSchema, passwordSchema } from "@/shared/schemas";
export const signupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type SignupSchema = z.infer<typeof signupSchema>;
