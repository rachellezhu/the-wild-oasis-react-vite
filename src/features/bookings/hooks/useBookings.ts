import { useQuery } from "react-query";
import { getBookings } from "../../../services/apiBookings";
import { BookingType } from "../../../types/booking-type";

type UseBookingsType = {
  isLoading: boolean;
  bookings: BookingType[] | undefined;
  error: unknown;
};

export function useBookings(): UseBookingsType {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { isLoading, error, bookings };
}
