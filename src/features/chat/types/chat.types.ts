export type UserPresenceStatus = "online" | "offline";

export interface UserState {
  userId: string;
  status: UserPresenceStatus;
  lastSeen?: string; // ISO string
}
