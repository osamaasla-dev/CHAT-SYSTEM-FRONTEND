export function SignupFormHeader() {
  return (
    <header className="space-y-2 text-center" aria-live="polite">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        Signup
      </p>
      <h2
        className="text-2xl font-semibold text-primary-dark"
        id="signup-form-title"
      >
        Create your operator profile
      </h2>
      <p className="text-sm text-muted-foreground" id="signup-form-description">
        Invite-only beta. Tell us how to reach you and we’ll provision your
        workspace within 24h.
      </p>
    </header>
  );
}
