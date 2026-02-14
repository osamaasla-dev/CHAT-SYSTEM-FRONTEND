import { Copy } from "lucide-react";
import { useState } from "react";

import { cn } from "@/shared/utils";

type UserNameBlockProps = {
  name: string;
  username: string;
  className?: string;
};

export const UserNameBlock = ({
  name,
  username,
  className,
}: UserNameBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard.writeText(username).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={cn("flex flex-1 flex-col justify-center gap-2", className)}>
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold text-primary">{name}</p>
        <div className="flex items-center gap-1">
          <p className="text-xs font-semibold text-muted-foreground">
            {username}
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className=" cursor-pointer inline-flex items-center justify-center rounded-full p-1 text-muted-foreground hover:bg-secondary/80 hover:text-primary transition-colors"
            aria-label="Copy username"
          >
            <Copy className="h-3 w-3" />
          </button>
          {copied && (
            <span className="text-[10px] font-medium text-success">Copied</span>
          )}
        </div>
      </div>
    </div>
  );
};
