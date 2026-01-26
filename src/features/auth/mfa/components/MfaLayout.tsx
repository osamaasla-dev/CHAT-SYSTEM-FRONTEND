import { MfaFormCard } from "./MfaFormCard";
export function MfaLayout() {
  return (
    <main
      data-testid="mfa-layout"
      className="flex h-screen flex-col overflow-hidden bg-secondary px-6 py-10"
      aria-label="Multi-factor authentication"
      role="main"
    >
      <div className="mx-auto flex h-full w-full max-w-4xl items-center justify-center px-2">
        <div className="w-full max-w-xl">
          <MfaFormCard />
        </div>
      </div>
    </main>
  );
}
