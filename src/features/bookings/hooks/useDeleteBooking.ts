import toast from "react-hot-toast";
import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { deleteBooking as deleteBookingApi } from "../../../services/apiBookings";
import { Tables } from "../../../types/supabase-type";

type UseDeleteBookingType = {
  isDeleting: boolean;
  deleteBooking: UseMutateFunction<
    unknown,
    Error,
    Tables<"bookings">["id"],
    unknown
  >;
};

export function useDeleteBooking(): UseDeleteBookingType {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId: Tables<"bookings">["id"]) =>
      deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success(`Booking  successfully deleted`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteBooking };
}
