import { PrivacyLevelOptions } from "../../shared/components/PrivacyLevelOptions";
import { USERNAME_SEARCH_OPTIONS } from "../constants/username-search-options";

export function UsernameSearch() {
  return (
    <PrivacyLevelOptions
      field="usernameSearch"
      description="Who can discover you by searching your `Username`"
      options={USERNAME_SEARCH_OPTIONS}
    />
  );
}
