import { SignupHero } from "./SignupHero";
import { SignupFormCard } from "./SignupFormCard";

interface SignupLayoutProps {
  className?: string;
}

export function SignupLayout({ className }: SignupLayoutProps) {
  return (
    <main
      data-testid="signup-layout"
      className={[
        "flex h-screen flex-col overflow-hidden bg-secondary px-6 py-10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Signup experience"
      role="main"
    >
      <div className="mx-auto flex h-full w-full max-w-6xl items-center">
        <div className="grid w-full gap-8 md:grid-cols-2 md:items-stretch">
          <SignupHero className="h-full" />
          <SignupFormCard className="h-full" />
        </div>
      </div>
    </main>
  );
}
