import { useQuery, useQueryClient } from "react-query";
import { getBookings, GetBookingsType } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/constants";
import { useState } from "react";

type UseBookingsType = {
  isLoading: boolean;
  bookings: GetBookingsType["data"] | undefined;
  count: GetBookingsType["count"] | undefined;
  error: unknown;
};

export function useBookings(): UseBookingsType {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sortValue = searchParams.get("sortBy");
  const filterRaw =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  const [filter, setFilter] = useState<{
    field: string;
    value: string;
  } | null>(null);

  const sortRaw = !sortValue ? "start_date-desc" : sortValue;
  const [field, direction] = sortRaw.split("-");
  const sortBy = { field, direction };
  const pageRaw = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const [page, setPage] = useState<number>(pageRaw);

  if (page !== pageRaw && filter?.value === filterRaw?.value) setPage(pageRaw);

  if (filter?.value !== filterRaw?.value) {
    searchParams.set("page", "1");
    setSearchParams(searchParams);
    setPage(1);
    setFilter(filterRaw);
  }

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil((count || 0) / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, bookings, count };
}
