import React, { useState } from "react";
import { useUser } from "./hooks/useUser";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";

export default function UpdateUserDataForm(): React.ReactElement {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  const [fullName, setFullName] = useState<string>(
    user?.user_metadata.full_name
  );
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files![0])}
          id="avatar"
        />
      </FormRow>

      <FormRow>
        <Button type="reset" $variation="secondary">
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}
