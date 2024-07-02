import { useQuery } from "react-query";
import { getCabins } from "../../../services/apiCabins";
import { Tables } from "../../../types/supabase-type";

type UseCabinsType = {
  isLoading: boolean;
  cabins: Tables<"cabins">[] | undefined;
  error: unknown;
};

export function useCabins(): UseCabinsType {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, error, cabins };
}
