import { Link } from "react-router-dom";

import { Button, SpinnerLayer } from "@/shared/components";
import { MFA_CODE_LENGTH } from "../constants";
import { useMfaForm } from "../hooks";
import { MfaCodeField } from "./MfaCodeField";
import { MfaFormHeader } from "./MfaFormHeader";
import { MfaVerificationNotice } from "./MfaVerificationNotice";

interface MfaFormCardProps {
  className?: string;
}

export function MfaFormCard({ className }: MfaFormCardProps) {
  const {
    register,
    errors,
    isValid,
    onSubmit,
    cooldown,
    cooldownLabel,
    handleResend,
    isBusy,
    isVerifying,
  } = useMfaForm();
  const titleId = "mfa-form-title";
  const descriptionId = "mfa-form-description";

  return (
    <div
      data-testid="mfa-form-card"
      className={[
        "relative w-full max-w-lg rounded-[32px] border border-light/70 bg-light p-8 shadow-xl sm:p-10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isBusy && <SpinnerLayer scope="parent" />}

      <MfaFormHeader
        titleId={titleId}
        descriptionId={descriptionId}
        codeLength={MFA_CODE_LENGTH}
      />

      <div className="mt-10 space-y-6">
        <MfaVerificationNotice
          cooldown={cooldown}
          cooldownLabel={cooldownLabel}
          isBusy={isBusy}
          onResend={handleResend}
        />

        <form
          className="space-y-6"
          onSubmit={onSubmit}
          noValidate
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          aria-busy={isBusy}
          data-testid="mfa-form"
        >
          <MfaCodeField
            register={register}
            error={errors.code}
            codeLength={MFA_CODE_LENGTH}
          />

          <Button
            type="submit"
            variant="submit"
            disabled={!isValid || isBusy}
            aria-live="polite"
          >
            {isVerifying ? "Verifying…" : "Verify & continue"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Need a different account?{" "}
          <Link to="/login" className="font-semibold text-primary">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
