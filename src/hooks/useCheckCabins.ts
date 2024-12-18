import { useQuery } from "react-query";
import { checkCabinIsAvailable } from "../services/apiBookings";
import { getToday } from "../utils/helpers";

export function useCheckCabins() {
  const fromDate = new Date("25 Jan 2025");
  const newFromDate = fromDate.toISOString();
  const toDate = new Date("25 Jan 2025");
  const newToDate = toDate.toISOString();

  const { data, isLoading } = useQuery({
    queryFn: () =>
      checkCabinIsAvailable({ fromDate: newFromDate, toDate: newToDate }),
  });

  console.log(newFromDate);
  console.log(newToDate);

  return data;
}
