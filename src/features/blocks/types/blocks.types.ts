export type BlockedContactUserStatus =
  | "PENDING"
  | "ACTIVE"
  | "INACTIVE"
  | "BANNED";

export type BlockedContactItem = {
  blockId: string;
  blockedUserId: string;
  name: string;
  username: string;
  avatarUrl: string | null;
  status: BlockedContactUserStatus;
  blockedAt: string;
};

export type BlockedContactsResponse = {
  items: BlockedContactItem[];
  meta: {
    limit: number;
    nextCursor: string | null;
  };
};
