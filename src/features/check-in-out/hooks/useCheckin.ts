import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { updateBooking } from "../../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Tables } from "../../../types/supabase-type";

type UseCheckinType = {
  isCheckingIn: boolean;
  checkin: UseMutateFunction<
    Tables<"bookings">,
    unknown,
    {
      bookingId: Tables<"bookings">["id"];
      breakfast?: {
        has_breakfast: boolean;
        extras_price: number;
        total_price: number;
      };
    },
    unknown
  >;
};

type CheckinType = {
  bookingId: Tables<"bookings">["id"];
  breakfast?: {
    has_breakfast: boolean;
    extras_price: number;
    total_price: number;
  };
};

export function useCheckin(): UseCheckinType {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }: CheckinType) =>
      breakfast
        ? updateBooking(bookingId, {
            status: "checked-in",
            is_paid: true,
            ...breakfast,
          })
        : updateBooking(bookingId, { status: "checked-in", is_paid: true }),
    onSuccess: (data: Tables<"bookings">) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries();
      navigate("/");
    },
    onError: () => {
      toast.error("There was an error while checking in");
    },
  });

  return { checkin, isCheckingIn };
}
