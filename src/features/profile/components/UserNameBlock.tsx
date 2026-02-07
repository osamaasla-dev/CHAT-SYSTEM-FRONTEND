import { cn } from "@/shared/utils";

type UserNameBlockProps = {
  name: string;
  username: string;
  className?: string;
};

export const UserNameBlock = ({ name, username, className }: UserNameBlockProps) => {
  return (
    <div className={cn("flex flex-1 flex-col justify-center gap-2", className)}>
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold text-primary">{name}</p>
        <p className="text-xs font-semibold text-muted-foreground">{username}</p>
      </div>
    </div>
  );
};
