import { LoginHero } from "./LoginHero";
import { LoginFormCard } from "./LoginFormCard";

interface LoginLayoutProps {
  className?: string;
}

export function LoginLayout({ className }: LoginLayoutProps) {
  return (
    <main
      data-testid="login-layout"
      className={[
        "flex h-screen flex-col overflow-hidden bg-secondary ",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Login experience"
      role="main"
    >
      <div className="mx-auto flex h-full w-full max-w-6xl items-center">
        <div className="grid w-full gap-8 md:grid-cols-2 md:items-stretch">
          <LoginHero className="h-full" />
          <LoginFormCard className="h-full" />
        </div>
      </div>
    </main>
  );
}
