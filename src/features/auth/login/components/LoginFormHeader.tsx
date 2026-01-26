export function LoginFormHeader() {
  return (
    <header className="space-y-2 text-center" aria-live="polite">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        Login
      </p>
      <h2
        className="text-2xl font-semibold text-primary-dark"
        id="login-form-title"
      >
        Welcome back, operator
      </h2>
      <p className="text-sm text-muted-foreground" id="login-form-description">
        Securely continue triaging threads and keep every conversation in view.
      </p>
    </header>
  );
}
