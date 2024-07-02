import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { createNewCabin, newCabin } from "../../../services/apiCabins";
import toast from "react-hot-toast";
import { Tables } from "../../../types/supabase-type";

type UseCreateCabinType = {
  isCreating: boolean;
  createCabin: UseMutateFunction<Tables<"cabins">, Error, newCabin, unknown>;
};

export function useCreateCabin(): UseCreateCabinType {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (newCabin: newCabin) => createNewCabin(newCabin),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { isCreating, createCabin };
}
