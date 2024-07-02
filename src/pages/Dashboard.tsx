import React from "react";
import Row from "../ui/Row";
import Heading from "../ui/Heading";

export default function Dashboard(): React.ReactElement {
  return (
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <p>TEST</p>
    </Row>
  );
}
