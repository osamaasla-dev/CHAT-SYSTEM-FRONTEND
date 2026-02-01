import { Mail } from "lucide-react";

type CurrentEmailCardProps = {
  email: string;
};

export const CurrentEmailCard = ({ email }: CurrentEmailCardProps) => {
  return (
    <section className="rounded-3xl border border-primary/10 bg-white/80 p-6 shadow-sm flex items-center gap-2">
      <div className="rounded-2xl bg-secondary p-2 text-primary">
        <Mail className="size-6" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Current email
        </p>
        <p className="text-xl font-semibold text-primary">{email}</p>
      </div>
    </section>
  );
};
