import { useQuery } from "react-query";
import { getStaysTodayActivity } from "../../../services/apiBookings";
import { getToday } from "../../../utils/helpers";

export function useTodayActivity() {
  const today = getToday({ end: true });

  const { data: todayActivity, isLoading: isGettingTodayActivity } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["bookings", today],
  });

  const checkins = todayActivity?.filter(
    (booking) => booking.status === "checked-in"
  );
  const checkouts = todayActivity?.filter(
    (booking) => booking.status === "checked-out"
  );

  return { todayActivity, today, checkins, checkouts, isGettingTodayActivity };
}
