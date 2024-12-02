import React from "react";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import { useBookings } from "./hooks/useBookings";
import Spinner from "../../ui/Spinner";
import { BookingType } from "../../types/booking-type";

export default function BookingTable(): React.ReactElement {
  const { bookings, isLoading } = useBookings();

  if (isLoading) return <Spinner />;

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
      </Table>
    </Menus>
  );
}
