import { z } from "zod";
import { passwordSchema, tokenSchema } from "@/shared/schemas";
export const resetPasswordFormSchema = z
  .object({
    token: tokenSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;
export type ResetPasswordPayload = Omit<
  ResetPasswordFormSchema,
  "confirmPassword"
>;
