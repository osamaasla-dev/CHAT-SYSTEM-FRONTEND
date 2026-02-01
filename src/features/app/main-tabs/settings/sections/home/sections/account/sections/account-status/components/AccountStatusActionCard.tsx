import type { ReactNode } from "react";

import { cn } from "@/shared/utils";

type AccountStatusActionCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
  titleClassName?: string;
};

export const AccountStatusActionCard = ({
  icon,
  title,
  description,
  children,
  titleClassName,
}: AccountStatusActionCardProps) => {
  return (
    <div className="flex items-start gap-3">
      <div>{icon}</div>
      <div className="space-y-2">
        <div>
          <h4 className={cn("font-semibold", titleClassName ?? "text-primary-dark")}>
            {title}
          </h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
};
