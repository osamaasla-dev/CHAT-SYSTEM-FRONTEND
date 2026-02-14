import { useEffect, useMemo, useState } from "react";
import {
  differenceInCalendarDays,
  differenceInCalendarYears,
  differenceInHours,
  format,
  formatDistanceToNow,
  isYesterday,
} from "date-fns";
import type { UserPresence } from "@/features/app/stores/presence.store";

export type LastSeenLabelProps = {
  presence?: UserPresence | undefined;
  className?: string;
};

/**
 * Small, self-contained component that renders a human-readable
 * "online / last seen" label and updates itself over time.
 */
export const LastSeenLabel = ({ presence, className }: LastSeenLabelProps) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 30_000); // update every 30 seconds

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const label = useMemo(() => {
    if (!presence) {
      return null;
    }

    if (presence.status === "online") {
      return "Online now";
    }

    if (!presence.timestamp) return null;

    const lastSeenDate = new Date(presence.timestamp);
    const nowDate = new Date(now);

    const hoursDiff = differenceInHours(nowDate, lastSeenDate);
    const daysDiff = differenceInCalendarDays(nowDate, lastSeenDate);
    const yearsDiff = differenceInCalendarYears(nowDate, lastSeenDate);

    // Less than 24 hours ago: show relative time (e.g. "3 hours ago")
    if (hoursDiff < 24 && daysDiff === 0) {
      return `Last seen ${formatDistanceToNow(lastSeenDate, { addSuffix: true })}`;
    }

    // Yesterday: "Yesterday" + time
    if (isYesterday(lastSeenDate)) {
      return `Last seen yesterday at ${format(lastSeenDate, "HH:mm")}`;
    }

    // Less than a week: weekday name + time
    if (daysDiff < 7) {
      return `Last seen ${format(lastSeenDate, "EEEE HH:mm")}`;
    }

    // Less than a year: month name + day + time
    if (yearsDiff < 1) {
      return `Last seen ${format(lastSeenDate, "MMMM d HH:mm")}`;
    }

    // More than a year: year + month + day + time
    return `Last seen ${format(lastSeenDate, "yyyy MMMM d HH:mm")}`;
  }, [presence, now]);

  if (!label) return null;

  return <span className={className}>{label}</span>;
};
