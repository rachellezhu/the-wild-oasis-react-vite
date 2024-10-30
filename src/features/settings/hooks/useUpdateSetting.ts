import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { Tables } from "../../../types/supabase-type";
import toast from "react-hot-toast";
import {
  NewSettingType,
  updateSetting as updateSettingApi,
} from "../../../services/apiSettings";

type UseUpdateSettingType = {
  isUpdating: boolean;
  updateSetting: UseMutateFunction<
    Tables<"settings">,
    Error,
    NewSettingType,
    unknown
  >;
};

export function useUpdateSetting(): UseUpdateSettingType {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: (newSetting: NewSettingType) => updateSettingApi(newSetting),
    onSuccess: () => {
      toast.success("Setting successfully updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, updateSetting };
}
