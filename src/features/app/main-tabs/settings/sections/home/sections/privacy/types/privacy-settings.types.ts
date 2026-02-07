export type PrivacyLevel = "ALL" | "CONTACTS" | "ONLY_ME";
export type PrivacySettings = {
  id: string;
  userId: string;
  onlineVisibility: boolean;
  lastSeenVisibility: boolean;
  readReceiptsVisibility: boolean;
  avatarVisibility: PrivacyLevel;
  allowDirectMessages: PrivacyLevel;
  usernameSearch: PrivacyLevel;
  updatedAt: Date;
};
export type UpdatePrivacySettingsInput = {
  onlineVisibility?: boolean;
  lastSeenVisibility?: boolean;
  readReceiptsVisibility?: boolean;
  avatarVisibility?: PrivacyLevel;
  allowDirectMessages?: PrivacyLevel;
  usernameSearch?: PrivacyLevel;
};
