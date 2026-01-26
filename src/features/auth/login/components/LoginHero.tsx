import { loginHighlights, loginStats } from "./content";

interface LoginHeroProps {
  className?: string;
}

const heroDescriptionId = "login-hero-description";
const highlightListId = "login-hero-highlights";
const statsListId = "login-hero-stats";

export function LoginHero({ className }: LoginHeroProps) {
  return (
    <article
      data-testid="login-hero"
      className={[
        "relative overflow-hidden rounded-[32px] border border-light/60 bg-linear-to-br",
        "from-light via-primary-light to-light p-10 text-primary-dark shadow-2xl",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="login-hero-title"
      aria-describedby={`${heroDescriptionId} ${highlightListId} ${statsListId}`.trim()}
      role="article"
    >
      <div
        className="pointer-events-none absolute -left-10 -top-24 h-52 w-52 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative space-y-6">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary-dark">
          Welcome Back
        </span>
        <h1
          id="login-hero-title"
          className="text-4xl font-semibold leading-tight"
        >
          Pick up every conversation exactly where you left off.
        </h1>
        <p
          id={heroDescriptionId}
          className="text-base leading-relaxed text-muted-foreground"
        >
          Secure re-entry with hardware bound sessions, instant MFA prompts, and
          device continuity so you never lose the trail.
        </p>

        <ul
          id={highlightListId}
          data-testid="login-highlights"
          className="space-y-3 text-sm"
          aria-label="Login benefits"
          role="list"
        >
          {loginHighlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-primary-dark"
              role="listitem"
            >
              <span
                className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-light"
                aria-hidden="true"
              >
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <dl
          id={statsListId}
          data-testid="login-stats"
          className="grid gap-4 rounded-2xl border border-light/70 bg-light/80 p-4 text-primary-dark sm:grid-cols-2"
          aria-label="Security statistics"
        >
          {loginStats.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                {label}
              </dt>
              <dd className="mt-1 text-2xl font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
