import { useQuery } from "react-query";
import { getBooking } from "../../../services/apiBookings";
import { useParams } from "react-router-dom";
import { BookingType } from "../../../types/booking-type";

type UseBookingType = {
  isLoading: boolean;
  booking: BookingType | undefined;
  error: unknown;
};

export function useBooking(): UseBookingType {
  const params = useParams();
  const id = params.bookingId;

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(Number(id)),
    retry: false,
  });

  return { isLoading, error, booking };
}
