import { Copy } from "lucide-react";

import { Button } from "@/shared/components";

type UsernameSectionProps = {
  username: string;
  onCopy: () => void;
  isCopied: boolean;
};

export const UsernameSection = ({ username, onCopy, isCopied }: UsernameSectionProps) => {
  const copyLabel = isCopied ? "Copied" : "Copy username";

  return (
    <div>
      <p className="mb-1 text-xs text-muted-foreground/70">Username</p>
      <div className="flex items-center gap-2">
        <span className="text-base text-primary" title={username}>
          {username}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={onCopy}
          className="rounded-full border-none bg-transparent text-primary hover:bg-primary/10"
          aria-label={copyLabel}
          title={copyLabel}
        >
          <Copy className="size-4" />
        </Button>
        {isCopied ? <span className="text-xs text-success">Copied!</span> : null}
      </div>
    </div>
  );
};
