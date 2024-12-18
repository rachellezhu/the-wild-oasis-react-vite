import React from "react";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import { useCheckCabins } from "../hooks/useCheckCabins";

export default function Bookings(): React.ReactElement {
  const data = useCheckCabins();
  console.log(data);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
}
