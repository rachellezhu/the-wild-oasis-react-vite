import React from "react";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import { useBookings } from "./hooks/useBookings";
import Spinner from "../../ui/Spinner";
import { BookingType } from "../../types/booking-type";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

export default function BookingTable(): React.ReactElement {
  const { bookings, count, isLoading } = useBookings();

  if (isLoading) return <Spinner />;

  if (!bookings?.length) return <Empty resource="bookings" />;

  return (
    <Menus>
      <Table $columns="0.6fr 2fr 2.8fr 1.4fr 1fr 3.2fr">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking as BookingType} />
          )}
        />

        <Table.Footer>
          <Pagination count={count || 0} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
