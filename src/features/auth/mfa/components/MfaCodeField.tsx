import type { FieldError, UseFormRegister } from "react-hook-form";
import { renderFormErrors } from "@/shared/utils";

import type { MfaCodeSchema } from "../schemas";

interface MfaCodeFieldProps {
  register: UseFormRegister<MfaCodeSchema>;
  error?: FieldError;
  codeLength: number;
}

export function MfaCodeField({
  register,
  error,
  codeLength,
}: MfaCodeFieldProps) {
  const inputProps = register("code");

  return (
    <div>
      <label
        htmlFor="mfa-code"
        className="text-sm font-semibold text-primary-dark"
      >
        Verification code
      </label>
      <input
        id="mfa-code"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={codeLength}
        {...inputProps}
        className="mt-3 w-full rounded-2xl border border-secondary bg-secondary/50 px-5 py-4 text-center text-3xl font-semibold tracking-[0.45em] text-dark placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
        placeholder={"·".repeat(codeLength)}
      />
      {renderFormErrors(error)}
    </div>
  );
}
