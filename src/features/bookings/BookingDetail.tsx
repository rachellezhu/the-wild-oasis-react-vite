import React from "react";
import styled from "styled-components";
import { statusToTagName } from "../../types/booking-type";
import { useMoveBack } from "../../hooks/useMoveBack";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";
import ButtonText from "../../ui/ButtonText";
import BookingDataBox from "./BookingDataBox";
import { useBookings } from "./hooks/useBookings";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

export default function BookingDetail(): React.ReactElement {
  const { bookings } = useBookings();
  const booking = bookings?.at(0);
  const status = "checked-in";

  const moveBack = useMoveBack();

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup as="h1">Booking #X</HeadingGroup>
        <Tag $type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        <ButtonText onClick={() => moveBack}>&larr;&nbsp;Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking!} />

      <ButtonGroup>
        <Button $variation="secondary" onClick={() => moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}
