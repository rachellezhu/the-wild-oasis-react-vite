import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { updateBooking } from "../../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Tables } from "../../../types/supabase-type";

type UseCheckinType = {
  isCheckingIn: boolean;
  checkin: UseMutateFunction<Tables<"bookings">, unknown, number, unknown>;
};

export function useChecking(): UseCheckinType {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, { status: "check-in", is_paid: true }),
    onSuccess: (data: Tables<"bookings">) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => {
      toast.error("There was an error while checking in");
    },
  });

  return { checkin, isCheckingIn };
}
