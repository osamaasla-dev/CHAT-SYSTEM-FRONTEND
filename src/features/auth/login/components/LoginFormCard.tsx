import { Link } from "react-router-dom";

import { useLoginForm } from "../hooks";
import { LoginFormHeader } from "./LoginFormHeader";
import { LoginFormFields } from "./LoginFormFields";
import { Button, SpinnerLayer } from "@/shared/components";
import { useGoogleLogin } from "../../providers/google/hooks";
import { FcGoogle } from "react-icons/fc";
import { useForgotPassword } from "../hooks/useForgotPassword";
import toast from "react-hot-toast";

interface LoginFormCardProps {
  className?: string;
}

export function LoginFormCard({ className }: LoginFormCardProps) {
  const {
    register,
    errors,
    isValid,
    isBusy,
    isSubmitSuccessful,
    onSubmit,
    getValues,
  } = useLoginForm();
  const { mutate: startGoogleAuth, isPending: isGooglePending } =
    useGoogleLogin();
  const { mutate: triggerForgotPassword, isPending: isForgotPending } =
    useForgotPassword();

  return (
    <div className="min-h-screen">
      <div
        data-testid="login-form-card"
        className={[
          "relative flex w-full max-w-lg flex-col rounded-[32px] border border-light/70 bg-light p-8 shadow-xl sm:p-10",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {isBusy && <SpinnerLayer scope="parent" />}
        <LoginFormHeader />

        <form
          data-testid="login-form"
          aria-labelledby="login-form-title"
          aria-describedby="login-form-description"
          aria-busy={isBusy}
          className="mt-10 space-y-6"
          onSubmit={onSubmit}
          noValidate
        >
          <LoginFormFields register={register} errors={errors} />

          <Button
            type="button"
            variant="link"
            disabled={isForgotPending}
            onClick={() => {
              const email = getValues("email");
              if (!email) {
                toast.error("Please enter your email");
                return;
              }

              triggerForgotPassword(email);
            }}
          >
            {isForgotPending ? "Sending reset link..." : "Forgot password?"}
          </Button>

          <Button
            type="submit"
            variant="submit"
            disabled={isBusy || !isValid}
            data-testid="login-submit"
            className="w-full"
            aria-disabled={isBusy || !isValid}
            aria-live="polite"
          >
            {isBusy ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-light/40 border-t-light" />
                Log in...
              </span>
            ) : (
              "Log in"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => startGoogleAuth()}
            disabled={isGooglePending}
            aria-live="polite"
          >
            <FcGoogle className="size-4" aria-hidden="true" />
            {isGooglePending
              ? "Connecting to Google..."
              : "Continue with Google"}
          </Button>
          <p
            className="text-center text-xs text-muted-foreground"
            aria-live="polite"
            role="status"
            data-testid="login-status"
          >
            {isSubmitSuccessful
              ? "Session secured. Redirecting you to console."
              : "End-to-end encrypted. Hardware keys supported."}
          </p>

          <p className="text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/signup" className="font-semibold text-primary">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
