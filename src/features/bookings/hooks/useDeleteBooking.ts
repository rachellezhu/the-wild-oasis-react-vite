import toast from "react-hot-toast";
import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { deleteBooking as deleteBookingApi } from "../../../services/apiBookings";
import { Tables } from "../../../types/supabase-type";

type UseDeleteBookingType = {
  isDeleting: boolean;
  deleteBooking: UseMutateFunction<
    Tables<"bookings">,
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
    onSuccess: (data: Tables<"bookings">) => {
      toast.success(`Booking #${data.id} successfully deleted`);
      queryClient.invalidateQueries();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteBooking };
}
