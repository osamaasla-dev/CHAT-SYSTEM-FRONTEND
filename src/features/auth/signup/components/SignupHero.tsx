import { signupHighlights, signupStats } from "./content";

interface SignupHeroProps {
  className?: string;
}

const heroDescriptionId = "signup-hero-description";
const highlightListId = "signup-hero-highlights";
const statsListId = "signup-hero-stats";

export function SignupHero({ className }: SignupHeroProps) {
  return (
    <article
      data-testid="signup-hero"
      className={[
        "relative overflow-hidden rounded-[32px] border border-light/60 bg-linear-to-br",
        "from-primary-light via-light to-light p-10 text-primary-dark shadow-2xl",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="signup-hero-title"
      aria-describedby={`${heroDescriptionId} ${highlightListId} ${statsListId}`.trim()}
      role="article"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-primary/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative space-y-6">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary-dark">
          Chat Console
        </span>
        <h1
          id="signup-hero-title"
          className="text-4xl font-semibold leading-tight"
        >
          A thoughtful inbox for every conversation you ship.
        </h1>
        <p
          id={heroDescriptionId}
          className="text-base leading-relaxed text-muted-foreground"
        >
          Launch collaborative chat experiences with guided triage,
          sentiment-aware alerts, and a crystal-clear audit trail. Built for
          teams that care about precision and calm.
        </p>

        <ul
          id={highlightListId}
          data-testid="signup-highlights"
          className="space-y-3 text-sm"
          aria-label="Signup benefits"
          role="list"
        >
          {signupHighlights.map((item) => (
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
          data-testid="signup-stats"
          className="grid gap-4 rounded-2xl border border-light/70 bg-light/80 p-4 text-primary-dark sm:grid-cols-2"
          aria-label="Support statistics"
        >
          {signupStats.map(({ label, value }) => (
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
