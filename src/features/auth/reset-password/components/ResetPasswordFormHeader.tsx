export function ResetPasswordFormHeader() {
  return (
    <header className="space-y-2 text-center" aria-live="polite">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        Reset password
      </p>
      <h2 className="text-2xl font-semibold text-primary-dark">
        Secure a new passphrase
      </h2>
      <p className="text-sm text-muted-foreground">
        Choose a strong password to secure your workspace. You will be
        redirected once the reset is complete.
      </p>
    </header>
  );
}
