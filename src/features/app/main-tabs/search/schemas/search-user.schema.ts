import { usernameSchema } from "@/shared/schemas";
import z from "zod";

export const searchUsernameSchema = z.object({
  username: usernameSchema,
});

export type SearchUsernameSchema = z.infer<typeof searchUsernameSchema>;
