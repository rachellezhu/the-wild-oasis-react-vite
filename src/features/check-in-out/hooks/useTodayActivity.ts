import { useQuery } from "react-query";
import { getStaysTodayActivity } from "../../../services/apiBookings";

export function useTodayActivity() {
  const { data: activities, isLoading: isGettingStays } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { activities, isGettingStays };
}
