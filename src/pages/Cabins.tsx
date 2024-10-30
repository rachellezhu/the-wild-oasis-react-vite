import React from "react";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";

export default function Cabins(): React.ReactElement {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Cabins</Heading>

        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />

        <AddCabin />
      </Row>
    </>
  );
}
