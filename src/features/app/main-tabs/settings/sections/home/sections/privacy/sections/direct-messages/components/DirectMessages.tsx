import { PrivacyLevelOptions } from "../../shared/components/PrivacyLevelOptions";
import { DIRECT_MESSAGES_OPTIONS } from "../constants/direct-messages-options";

export function DirectMessages() {
  return (
    <PrivacyLevelOptions
      field="allowDirectMessages"
      description="Who can send you `Direct Messages`."
      options={DIRECT_MESSAGES_OPTIONS}
    />
  );
}
