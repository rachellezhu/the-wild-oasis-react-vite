import React from "react";
import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";

export default function Users(): React.ReactElement {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </>
  );
}
