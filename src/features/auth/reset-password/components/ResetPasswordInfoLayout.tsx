import { Link } from "react-router-dom";

const cardClass =
  "max-w-lg w-full rounded-3xl border border-light/70 bg-light p-10 text-center shadow-xl";

export const ResetPasswordInfoLayout = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-secondary px-4 py-16">
      <div className={cardClass}>
        <div className="space-y-6" aria-live="polite">
          <div className="space-y-4" role="status" aria-live="assertive">
            <h2 className="text-2xl font-bold text-primary-dark">
              Reset link sent
            </h2>
            <p className="font-medium text-muted-foreground">
              We sent a secure link to your email. Check your inbox and click
              the Reset Password button to set a new password. If you didn’t see
              it, check your spam folder or request a new reset link from the
              login page.
            </p>
            <p className="text-sm text-muted-foreground">
              This link expires soon, so be sure to complete the reset within a
              few minutes to keep your account protected.
            </p>
          </div>
          <div className="pt-6">
            <Link
              to="/login"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
