import { useQuery } from "react-query";
import { Tables } from "../../../types/supabase-type";
import { getSettings } from "../../../services/apiSettings";

type UseSettingsType = {
  isLoading: boolean;
  settings: Tables<"settings"> | undefined;
  error: unknown;
};

export function useSettings(): UseSettingsType {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, error, settings };
}
