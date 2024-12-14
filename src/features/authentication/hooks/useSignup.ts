import { UseMutateFunction, useMutation } from "react-query";
import {
  signup as signupApi,
  SignupParamsType,
} from "../../../services/apiAuth";
import { UserResponse } from "@supabase/supabase-js";
import toast from "react-hot-toast";

type UseSignupType = {
  isSigningUp: boolean;
  signup: UseMutateFunction<
    UserResponse["data"],
    unknown,
    SignupParamsType,
    unknown
  >;
};

export function useSignup(): UseSignupType {
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: ({ full_name, email, password }: SignupParamsType) =>
      signupApi({ full_name, email, password }),
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },
  });

  return { signup, isSigningUp };
}
