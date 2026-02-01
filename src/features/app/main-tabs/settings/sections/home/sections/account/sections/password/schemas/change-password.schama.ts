import { passwordSchema } from "@/shared/schemas";
import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required")
      .regex(/^[^\s]+$/, "Current password must not contain spaces"),
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
export type ChangePasswordRequest = Omit<
  ChangePasswordSchema,
  "confirmPassword"
>;
