import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { logout as logoutApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";

type UseLogoutType = {
  isLoggingOut: boolean;
  logout: UseMutateFunction<void, unknown, void, unknown>;
};

export function useLogout(): UseLogoutType {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
  });

  return { logout, isLoggingOut };
}
