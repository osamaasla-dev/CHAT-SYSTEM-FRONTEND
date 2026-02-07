import { PrivacyLevelOptions } from "../../shared/components/PrivacyLevelOptions";
import { AVATAR_OPTIONS } from "../constants/avatar-options";

export function ProfileAvatar() {
  return (
    <PrivacyLevelOptions
      field="avatarVisibility"
      description="Who can see your `Profile Avatar` across the app."
      options={AVATAR_OPTIONS}
    />
  );
}
