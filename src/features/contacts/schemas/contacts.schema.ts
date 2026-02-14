import { z } from "zod";

const CONTACTS_MAX_LIMIT = 50;
const CONTACTS_MIN_LIMIT = 20;

export const contactsQuerySchema = z.object({
  limit: z
    .number()
    .int()
    .min(CONTACTS_MIN_LIMIT)
    .max(CONTACTS_MAX_LIMIT)
    .optional(),
  cursor: z.string().optional(),
  search: z.string().optional(),
});

export type ContactsQuerySchema = z.infer<typeof contactsQuerySchema>;
