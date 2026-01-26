import { apiPost } from "@/shared/lib/api";
import type {
  MfaCodeSchema,
  MfaChallengeResponse,
  MfaVerifyResponse,
} from "../schemas";

export const mfaChallengeApi = async () =>
  await apiPost<MfaChallengeResponse>("/auth/mfa/challenge");

export const mfaVerifyApi = async (payload: MfaCodeSchema) =>
  await apiPost<MfaVerifyResponse>("/auth/mfa/verify", payload);
