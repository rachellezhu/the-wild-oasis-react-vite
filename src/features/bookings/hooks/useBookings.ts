import { useQuery } from "react-query";
import { getBookings } from "../../../services/apiBookings";
import { BookingType } from "../../../types/booking-type";
import { useSearchParams } from "react-router-dom";

type UseBookingsType = {
  isLoading: boolean;
  bookings: BookingType[] | undefined;
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

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { isLoading, error, bookings };
}
