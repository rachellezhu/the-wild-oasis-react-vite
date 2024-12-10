import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { updateBooking } from "../../../services/apiBookings";
import toast from "react-hot-toast";
import { Tables } from "../../../types/supabase-type";

type UseCheckoutType = {
  isCheckingOut: boolean;
  checkout: UseMutateFunction<
    Tables<"bookings">,
    unknown,
    Tables<"bookings">["id"],
    unknown
  >;
};

export function useCheckout(): UseCheckoutType {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId: Tables<"bookings">["id"]) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data: Tables<"bookings">) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error("There was an error while checking out");
    },
  });

  return { checkout, isCheckingOut };
}
