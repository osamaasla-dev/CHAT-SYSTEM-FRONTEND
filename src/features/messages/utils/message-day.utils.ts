import {
  differenceInCalendarDays,
  format,
  isToday,
  isValid,
  isYesterday,
  parseISO,
} from "date-fns";

const parseDate = (isoDate: string): Date | null => {
  const parsedIsoDate = parseISO(isoDate);
  if (isValid(parsedIsoDate)) {
    return parsedIsoDate;
  }

  const parsedFallbackDate = new Date(isoDate);
  return isValid(parsedFallbackDate) ? parsedFallbackDate : null;
};

export const getMessageDayKey = (isoDate: string): string | null => {
  const parsedDate = parseDate(isoDate);
  if (!parsedDate) {
    return null;
  }

  return format(parsedDate, "yyyy-MM-dd");
};

export const formatMessageTime = (isoDate: string): string => {
  const parsedDate = parseDate(isoDate);
  if (!parsedDate) {
    return "";
  }

  return format(parsedDate, "h:mm a");
};

export const formatMessageDayLabel = (
  isoDate: string,
  now: Date = new Date(),
): string => {
  const parsedDate = parseDate(isoDate);
  if (!parsedDate) {
    return "";
  }

  if (isToday(parsedDate)) {
    return "Today";
  }

  if (isYesterday(parsedDate)) {
    return "Yesterday";
  }

  const dayDifference = differenceInCalendarDays(now, parsedDate);

  if (dayDifference < 7) {
    return format(parsedDate, "EEEE");
  }

  if (parsedDate.getFullYear() === now.getFullYear()) {
    return format(parsedDate, "d MMMM");
  }

  return format(parsedDate, "d/M/yyyy");
};
