import { ShieldAlert } from "lucide-react";

import { cn } from "@/shared/utils";

type AccountStatusSummaryCardProps = {
  statusLabel: string;
  toneClassName: string;
  isScheduledForDeletion: boolean;
  deletionDateLabel?: string;
  deletionDateTimeLabel?: string;
};

export const AccountStatusSummaryCard = ({
  statusLabel,
  toneClassName,
  isScheduledForDeletion,
  deletionDateLabel,
}: AccountStatusSummaryCardProps) => {
  return (
    <section className="rounded-3xl border border-primary/10 bg-white/80 p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-secondary p-3 text-primary">
          <ShieldAlert className="size-7" />
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Account status
          </p>
          <h2 className="text-2xl font-semibold text-primary-dark">
            {statusLabel}
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage how your profile appears to others and whether it can receive
            new activity.
          </p>
          {isScheduledForDeletion && (
            <p className="text-sm font-medium text-danger">
              Scheduled for deletion on {deletionDateLabel} unless you cancel
              it.
            </p>
          )}
          <span
            className={cn(
              "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
              toneClassName,
            )}
          >
            {statusLabel}
          </span>
        </div>
      </div>
    </section>
  );
};
