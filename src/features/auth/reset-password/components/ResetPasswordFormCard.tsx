import { Link } from "react-router-dom";

import { Button, SpinnerLayer } from "@/shared/components";
import { useResetPasswordForm } from "../hooks/ui/useResetPasswordForm";
import { ResetPasswordFormFields } from "./ResetPasswordFormFields";
import { ResetPasswordFormHeader } from "./ResetPasswordFormHeader";

interface ResetPasswordFormCardProps {
  token?: string | null;
}

export function ResetPasswordFormCard({ token }: ResetPasswordFormCardProps) {
  const { register, errors, isValid, isPending, isTokenMissing, onSubmit } =
    useResetPasswordForm({ token });

  return (
    <div
      data-testid="reset-password-form-card"
      className="relative w-full max-w-lg rounded-[32px] border border-light/70 bg-light p-8 shadow-xl sm:p-10"
    >
      {isPending && <SpinnerLayer scope="parent" />}

      <ResetPasswordFormHeader />

      <form
        className="mt-10 space-y-6"
        onSubmit={onSubmit}
        noValidate
        aria-busy={isPending}
      >
        {isTokenMissing ? (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            This reset link is invalid or expired. Request a new one from the
            login screen.
          </div>
        ) : (
          <>
            <ResetPasswordFormFields register={register} errors={errors} />

            <Button
              type="submit"
              variant="submit"
              className="w-full"
              disabled={!isValid || isPending}
              aria-live="polite"
            >
              {isPending ? "Resetting…" : "Reset password"}
            </Button>
          </>
        )}

        <p className="text-center text-sm text-muted-foreground">
          Remembered your password?{" "}
          <Link to="/login" className="font-semibold text-primary">
            Back to login
          </Link>
        </p>
      </form>
    </div>
  );
}
