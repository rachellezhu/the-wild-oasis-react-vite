import React from "react";
import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useUpdateUser } from "./hooks/useUpdateUser";
import SpinnerMini from "../../ui/SpinnerMini";

export default function UpdatePassword(): React.ReactElement {
  const { register, handleSubmit, formState, getValues, reset } = useForm<{
    password: string;
    password_confirmation: string;
  }>({
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });
  const { errors } = formState;
  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit(data: { password: string; password_confirmation: string }) {
    updateUser({ password: data.password }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="New password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          autoComplete="current-password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
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
          autoComplete="new-password"
          id="password-confirmation"
          {...register("password_confirmation", {
            required: "This field is required",
            validate: (value) =>
              getValues("password") === value || "Password need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          onClick={() => reset()}
          type="reset"
          $variation="secondary"
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>
          {isUpdating ? <SpinnerMini /> : "Update password"}
        </Button>
      </FormRow>
    </Form>
  );
}
