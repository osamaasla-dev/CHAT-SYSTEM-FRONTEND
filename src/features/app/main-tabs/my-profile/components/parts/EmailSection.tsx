import { Mail } from "lucide-react";

type EmailSectionProps = {
  email: string;
};

export const EmailSection = ({ email }: EmailSectionProps) => {
  return (
    <div>
      <p className="mb-1 text-xs text-muted-foreground/70">Email address</p>
      <div className="flex items-center gap-2">
        <Mail className="size-4 text-primary" />
        <span className="text-base text-primary">{email}</span>
      </div>
    </div>
  );
};
