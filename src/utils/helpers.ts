import { formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns";

// We want to make this function work for both Date objects and strings (which came from Supapbase)

export const substractDates = (dateStr1: string, dateStr2: string): number =>
  differenceInDays(parseISO(dateStr1), parseISO(dateStr2));

export const formatDistanceFromNow = (dateStr: string): string =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time

export const getToday = function (options?: { end?: boolean }): string {
  const today = new Date();

  // This is necessary to campare with created_at from Supabase, because it is not at 0.0.0.0, so we need to set the date tobe END of the day when we compare it with earlier dates

  // Set to the last second of the day

  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);

  return today.toISOString();
};

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const getProperty = <T, K extends keyof T>(obj: T, key: K) => {
  return typeof obj[key];
};
