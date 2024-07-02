import React, { useEffect, useState } from "react";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

export default function Cabins(): React.ReactElement {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Cabins</Heading>

        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}
