import React from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

export default function Settings(): React.ReactElement {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}
