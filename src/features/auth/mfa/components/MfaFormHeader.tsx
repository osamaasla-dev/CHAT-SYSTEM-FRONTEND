interface MfaFormHeaderProps {
  descriptionId: string;
  titleId: string;
  codeLength: number;
}

export function MfaFormHeader({
  descriptionId,
  titleId,
  codeLength,
}: MfaFormHeaderProps) {
  return (
    <header className="space-y-2 text-center" aria-live="polite">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        Multi-factor
      </p>
      <h2 className="text-2xl font-semibold text-primary-dark" id={titleId}>
        Confirm your one-time code
      </h2>
      <p className="text-sm text-muted-foreground" id={descriptionId}>
        A {codeLength}-digit verification code will send to your inbox. Enter it
        exactly as it appears to secure your session.
      </p>
    </header>
  );
}
