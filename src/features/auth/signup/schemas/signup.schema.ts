import { z } from "zod";
import { emailSchema, nameSchema, passwordSchema } from "@/shared/schemas";
export const signupSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
export type SignupPayload = Omit<SignupSchema, "confirmPassword">;
