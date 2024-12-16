import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import {
  updateUser as updateUserApi,
  UpdateUserParamsType,
} from "../../../services/apiAuth";
import toast from "react-hot-toast";
import { UserResponse } from "@supabase/supabase-js";

type UseUpdateUserType = {
  isUpdating: boolean;
  updateUser: UseMutateFunction<
    UserResponse["data"],
    Error,
    UpdateUserParamsType,
    unknown
  >;
};

export function useUpdateUser(): UseUpdateUserType {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({ full_name, avatar, password }: UpdateUserParamsType) =>
      updateUserApi({ full_name, avatar, password }),
    onSuccess: (data) => {
      toast.success("User data successfully updated");
      queryClient.setQueryData(["user"], data.user);
    },
    onError: (error: Error) => {
      console.error(error.message);
      toast.error(error.message);
    },
  });

  return { updateUser, isUpdating };
}
