import React from "react";
import { useForm } from "react-hook-form";
import { SignupParamsType } from "../../services/apiAuth";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

export default function UpdatePassword(): React.ReactElement {
  const { register, handleSubmit, formState, getValues, reset } = useForm<{
    password: string;
    password_confirmation: string;
  }>();
  const { errors } = formState;

  function onSubmit({ password }: SignupParamsType["password"]) {
    //
  }

  return (
    <Form>
      <FormRow
        label="Password (min 8 characters)"
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
        <Button onClick={() => reset()} type="reset" $variation="secondary">
          Cancel
        </Button>
        <Button>Update password</Button>
      </FormRow>
    </Form>
  );
}
