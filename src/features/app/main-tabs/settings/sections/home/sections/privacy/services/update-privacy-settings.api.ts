import { apiPatch } from "@/shared/lib";
import type { UpdatePrivacySettingsInput } from "../types/privacy-settings.types";

export const updatePrivacySettingsApi = async (
  payload: UpdatePrivacySettingsInput,
) => await apiPatch<void>("/settings/privacy", payload);
