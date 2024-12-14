import React from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../../utils/constants";
import { useSignup } from "./hooks/useSignup";
import { SignupParamsType } from "../../services/apiAuth";

export default function SignupForm(): React.ReactElement {
  const { register, formState, getValues, handleSubmit, reset } = useForm<
    SignupParamsType & {
      password_confirmation: string;
    }
  >({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });
  const { errors } = formState;
  const { signup, isSigningUp } = useSignup();

  function onSubmit(data: SignupParamsType) {
    signup(data, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.full_name?.message}>
        <Input
          type="text"
          id="full-name"
          disabled={isSigningUp}
          {...register("full_name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isSigningUp}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password need a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password confirmation"
        error={errors.password_confirmation?.message}
      >
        <Input
          type="password"
          id="password-confirmation"
          disabled={isSigningUp}
          {...register("password_confirmation", {
            required: "This field is required",
            validate: (value) =>
              value === getValues("password") || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset" disabled={isSigningUp}>
          Cancel
        </Button>
        <Button disabled={isSigningUp}>Create new user</Button>
      </FormRow>
    </Form>
  );
}
