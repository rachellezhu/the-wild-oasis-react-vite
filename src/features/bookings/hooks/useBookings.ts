import { useQuery } from "react-query";
import { getBookings, GetBookingsType } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

type UseBookingsType = {
  isLoading: boolean;
  bookings: GetBookingsType["data"] | undefined;
  count: GetBookingsType["count"] | undefined;
  error: unknown;
};

export function useBookings(): UseBookingsType {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sortValue = searchParams.get("sortBy");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  const sortRaw = !sortValue ? "start_date-desc" : sortValue;
  const [field, direction] = sortRaw.split("-");
  const sortBy = { field, direction };
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { isLoading, error, bookings, count };
}
