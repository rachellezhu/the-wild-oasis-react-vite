import { useQuery } from "react-query";
import { Tables } from "../../../types/supabase-type";
import { getBookings } from "../../../services/apiBookings";

type UseBookingsType = {
  isLoading: boolean;
  bookings: Tables<"bookings">[] | undefined;
  error: unknown;
};

export function useBookings(): UseBookingsType {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getBookings,
  });

  return { isLoading, error, bookings };
}
