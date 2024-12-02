import React from "react";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import BookingTable from "../features/bookings/BookingTable";

export default function Bookings(): React.ReactElement {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Bookings</Heading>
        <p>TEST</p>
      </Row>
      <BookingTable />
    </>
  );
}
