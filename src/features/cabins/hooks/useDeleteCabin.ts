import toast from "react-hot-toast";
import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { deleteCabin as deleteCabinApi } from "../../../services/apiCabins";
import { Tables } from "../../../types/supabase-type";

type UseDeleteCabinType = {
  isDeleting: boolean;
  deleteCabin: UseMutateFunction<Tables<"cabins">, Error, number, unknown>;
};

export function useDeleteCabin(): UseDeleteCabinType {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id: Tables<"cabins">["id"]) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteCabin };
}
