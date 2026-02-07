export type ContactUserStatus = "PENDING" | "ACTIVE" | "INACTIVE" | "BANNED";

export type ContactItem = {
  contactId: string;
  name: string;
  username: string;
  avatarUrl: string | null;
  status: ContactUserStatus;
  blockedAt: string | null;
  addedAt: string;
};

export type ContactsResponse = {
  items: ContactItem[];
  meta: {
    limit: number;
    nextCursor: string | null;
  };
};
