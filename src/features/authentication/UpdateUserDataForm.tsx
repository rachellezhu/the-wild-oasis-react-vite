import React from "react";
import { useUser } from "./hooks/useUser";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import { useUpdateUser } from "./hooks/useUpdateUser";
import { useForm } from "react-hook-form";
import { UpdateUserParamsType } from "../../services/apiAuth";
import SpinnerMini from "../../ui/SpinnerMini";

export default function UpdateUserDataForm(): React.ReactElement {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const {
    register,
    formState: { isDirty, errors },
    handleSubmit,
    getValues,
  } = useForm<UpdateUserParamsType>({
    defaultValues: {
      full_name: user?.user_metadata.full_name || "",
      avatar: user?.user_metadata.avatar || "/img/default-user.jpg",
    },
  });
  const noData = !getValues("full_name") || !getValues("avatar");

  function onSubmit(data: UpdateUserParamsType) {
    const avatar =
      data.avatar instanceof FileList ? data.avatar[0] : data.avatar;

    updateUser({ full_name: data.full_name, avatar: avatar });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email address">
        <Input value={user?.email} disabled />
      </FormRow>

      <FormRow label="Full name" error={errors.full_name?.message}>
        <Input
          id="full-name"
          disabled={isUpdating}
          {...register("full_name", { required: "This field is required" })}
          defaultValue={getValues("full_name")}
        />
      </FormRow>

      <FormRow label="Avatar image" error={errors.avatar?.message}>
        <FileInput
          accept="image/*"
          id="avatar"
          disabled={isUpdating}
          {...register("avatar", { required: false })}
        />
      </FormRow>

      {user?.user_metadata.avatar && (
        <FormRow label="Current avatar">
          <img
            src={user?.user_metadata.avatar}
            style={{ maxWidth: "360px", maxHeight: "auto" }}
            alt={`Avatar of ${user?.user_metadata.full_name}`}
            width="auto"
            height="auto"
          />
        </FormRow>
      )}

      <FormRow>
        <Button type="reset" $variation="secondary" disabled={isUpdating}>
          Cancel
        </Button>
        <Button disabled={!isDirty || isUpdating || noData}>
          {isUpdating ? <SpinnerMini /> : "Update account"}
        </Button>
      </FormRow>
    </Form>
  );
}
