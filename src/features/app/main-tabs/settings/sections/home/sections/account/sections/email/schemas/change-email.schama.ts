import { emailSchema } from "@/shared/schemas";
import { z } from "zod";

export const changeEmailSchema = z.object({
  newEmail: emailSchema,
});
export type ChangeEmailSchema = z.infer<typeof changeEmailSchema>;
