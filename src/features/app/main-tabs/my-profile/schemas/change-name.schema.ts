import { z } from "zod";
import { nameSchema } from "@/shared/schemas";
export const changeNameSchema = z.object({
  name: nameSchema,
});

export type ChangeNameSchema = z.infer<typeof changeNameSchema>;
