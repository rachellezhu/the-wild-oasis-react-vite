import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Table from "../../ui/Table";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import Tag from "../../ui/Tag";
import { BookingType, statusToTagName } from "../../types/booking-type";

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
  text-align: end;
  font-family: "Sono";
  font-weight: 500;
`;

export default function BookingRow({
  booking,
}: {
  booking: BookingType;
}): React.ReactElement {
  const navigate = useNavigate();

  return (
    <Table.Row>
      <Cabin>{booking.cabins.name}</Cabin>

      <Stacked>
        <span>{booking.guests.full_name}</span>
        <span>{booking.guests.email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(booking.start_date!))
            ? "Today"
            : formatDistanceFromNow(booking.start_date!)}
          &nbsp;&rarr;&nbsp;{booking.num_nights}&nbsp;night stay
        </span>
        <span>
          {format(new Date(booking.start_date!), "MMM dd yyyy")}
          &nbsp;&mdash;&nbsp;
          {format(new Date(booking.end_date!), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag $type={statusToTagName[booking.status!]}>
        {booking.status?.replace("-", " ")}
      </Tag>

      <Amount>{formatCurrency(Number(booking.total_price))}</Amount>
    </Table.Row>
  );
}
