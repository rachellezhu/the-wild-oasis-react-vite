import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { editExistingCabin, NewCabinType } from "../../../services/apiCabins";
import toast from "react-hot-toast";
import { Tables } from "../../../types/supabase-type";

type UseUpdateCabinType = {
  isUpdating: boolean;
  updateCabin: UseMutateFunction<
    Tables<"cabins">,
    Error,
    {
      cabin: NewCabinType;
      id: Tables<"cabins">["id"];
    },
    unknown
  >;
};

export function useUpdateCabin(): UseUpdateCabinType {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({
      cabin,
      id,
    }: {
      cabin: NewCabinType;
      id: Tables<"cabins">["id"];
    }) => editExistingCabin(cabin, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, updateCabin };
}
