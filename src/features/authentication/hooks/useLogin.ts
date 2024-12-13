import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { login as loginApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthResponsePassword } from "@supabase/supabase-js";

type UseLoginType = {
  isLoggingIn: boolean;
  login: UseMutateFunction<
    AuthResponsePassword["data"],
    Error,
    {
      email: string;
      password: string;
    },
    unknown
  >;
};

export function useLogin(): UseLoginType {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
      navigate("/dashboard", { replace: true });
    },
    onError: (error: Error) => {
      console.error("Error", error);
      toast.error("Provided email or password are incorrent");
    },
  });

  return { login, isLoggingIn };
}
