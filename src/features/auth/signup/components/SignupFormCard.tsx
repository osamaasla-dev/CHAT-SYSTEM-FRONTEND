import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useSignupForm } from "../hooks";
import { SignupFormFields } from "./SignupFormFields";
import { SignupFormHeader } from "./SignupFormHeader";
import { Button, SpinnerLayer } from "@/shared/components";
import { useGoogleLogin } from "../../providers/google/hooks/useGoogle";

interface SignupFormCardProps {
  className?: string;
}

export function SignupFormCard({ className }: SignupFormCardProps) {
  const { register, errors, isValid, isBusy, isSubmitSuccessful, onSubmit } =
    useSignupForm();
  const { mutate: startGoogleAuth, isPending: isGooglePending } =
    useGoogleLogin();

  return (
    <div
      data-testid="signup-form-card"
      className={[
        "relative flex w-full max-w-lg flex-col rounded-[32px] border border-light/70 bg-light p-8 shadow-xl sm:p-10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isBusy && <SpinnerLayer scope="parent" />}
      <SignupFormHeader />

      <form
        data-testid="signup-form"
        aria-labelledby="signup-form-title"
        aria-describedby="signup-form-description"
        aria-busy={isBusy}
        className="mt-10 space-y-6"
        onSubmit={onSubmit}
        noValidate
      >
        <SignupFormFields register={register} errors={errors} />

        <Button
          type="submit"
          variant="submit"
          disabled={isBusy || !isValid}
          data-testid="signup-submit"
          className="w-full"
          aria-disabled={isBusy || !isValid}
          aria-live="polite"
        >
          {isBusy ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-light/40 border-t-light" />
              Creating...
            </span>
          ) : (
            "Create account"
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
          {isGooglePending ? "Connecting to Google..." : "Continue with Google"}
        </Button>
        <p
          className="text-center text-xs text-muted-foreground"
          aria-live="polite"
          role="status"
          data-testid="signup-status"
        >
          {isSubmitSuccessful
            ? "We sent you a confirmation email."
            : "Encrypted in transit & at rest."}
        </p>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
