import { z } from "zod";

const BLOCKED_CONTACTS_MAX_LIMIT = 50;
const BLOCKED_CONTACTS_MIN_LIMIT = 20;

export const blockedContactsQuerySchema = z.object({
  limit: z
    .number()
    .int()
    .min(BLOCKED_CONTACTS_MIN_LIMIT)
    .max(BLOCKED_CONTACTS_MAX_LIMIT)
    .optional(),
  cursor: z.string().optional(),
});

export type BlockedContactsQuerySchema = z.infer<
  typeof blockedContactsQuerySchema
>;
