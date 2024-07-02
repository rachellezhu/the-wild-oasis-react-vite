import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { editExistingCabin, newCabin } from "../../../services/apiCabins";
import toast from "react-hot-toast";
import { Tables } from "../../../types/supabase-type";

type UseEditCabinType = {
  isEditing: boolean;
  editCabin: UseMutateFunction<
    Tables<"cabins">,
    Error,
    {
      cabin: newCabin;
      id: Tables<"cabins">["id"];
    },
    unknown
  >;
};

export function useEditCabin(): UseEditCabinType {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({
      cabin,
      id,
    }: {
      cabin: newCabin;
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

  return { isEditing, editCabin };
}
