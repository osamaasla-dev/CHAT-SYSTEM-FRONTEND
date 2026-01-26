import { z } from "zod";
import { MFA_CODE_LENGTH } from "../constants";

export const mfaCodeSchema = z.object({
  code: z
    .string({ message: "MFA code is required" })
    .min(MFA_CODE_LENGTH, {
      message: `MFA code must be exactly ${MFA_CODE_LENGTH} characters`,
    })
    .regex(/^\d+$/, {
      message: "MFA code must contain only numbers",
    }),
});

export type MfaCodeSchema = z.infer<typeof mfaCodeSchema>;

export type MfaChallengeResponse = {
  expiresIn: number;
};

export type MfaVerifyResponse = {
  verified: boolean;
};
