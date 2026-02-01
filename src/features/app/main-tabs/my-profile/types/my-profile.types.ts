export interface MyProfileInfo {
  avatarUrl: string | null;
  username: string;
  name: string;
  email: string;
  hasPassword: boolean;
  status: "ACTIVE" | "INACTIVE" | "BANNED";
  deletedAt: Date | null;
}
