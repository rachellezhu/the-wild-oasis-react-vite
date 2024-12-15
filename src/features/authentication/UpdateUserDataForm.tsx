import React, { useState } from "react";
import { useUser } from "./hooks/useUser";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import { useUpdateUser } from "./hooks/useUpdateUser";

export default function UpdateUserDataForm(): React.ReactElement {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  const [fullName, setFullName] = useState<string>(
    user?.user_metadata.full_name || ""
  );
  const [avatar, setAvatar] = useState<string | File | null>(
    user?.user_metadata.avatar || null
  );
  const { updateUser, isUpdating } = useUpdateUser();
  const noData = fullName === "" || !avatar;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (fullName === "" || !avatar) return;

    updateUser({ full_name: fullName, avatar: avatar });
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FormRow label="Email address">
        <Input value={user?.email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="full-name"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Avatar image">
        <div>
          <FileInput
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files![0])}
            id="avatar"
            disabled={isUpdating}
          />
          {typeof avatar === "string" && (
            <FormRow>
              <img src={avatar} alt="" />
            </FormRow>
          )}
        </div>
      </FormRow>

      <FormRow>
        <Button type="reset" $variation="secondary" disabled={isUpdating}>
          Cancel
        </Button>
        <Button disabled={noData || isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}
