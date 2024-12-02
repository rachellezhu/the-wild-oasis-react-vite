import React from "react";
import styled from "styled-components";
import { Tables } from "../../types/supabase-type";
import { useNavigate } from "react-router-dom";
import Table from "../../ui/Table";
import { format, isToday } from "date-fns";
import { formatDistanceFromNow } from "../../utils/helpers";

type CabinType = {
  cabin: {
    name: Tables<"cabins">["name"];
  };
};

type GuestType = {
  guest: {
    full_name: Tables<"guests">["full_name"];
    email: Tables<"guests">["email"];
  };
};

type BookingRowPropsType = CabinType &
  GuestType & {
    [Property in keyof Tables<"bookings"> as Exclude<
      Property,
      | "cabin_id"
      | "guest_id"
      | "cabin_price"
      | "extras_price"
      | "has_breakfast"
      | "is_paid"
      | "observations"
    >]: Tables<"bookings">[Property];
  };

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

export default function BookingRow(booking: BookingRowPropsType) {
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{booking.cabin.name}</Cabin>

      <Stacked>
        <span>{booking.guest.full_name}</span>
        <span>{booking.guest.email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(booking.start_date!))
            ? "Today"
            : formatDistanceFromNow(booking.start_date!)}
          &nbsp;&rarr;{booking.num_nights} night stay
        </span>
        <span>
          {format(new Date(booking.start_date!), "MMM dd yyyy")}
          &nbsp;&mdash;&nbsp;
          {format(new Date(booking.end_date!), "MMM dd yyyy")}
        </span>
      </Stacked>
    </Table.Row>
  );
}
