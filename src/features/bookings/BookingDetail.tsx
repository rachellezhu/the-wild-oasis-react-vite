import React from "react";
import styled from "styled-components";
import { statusToTagName } from "../../types/booking-type";
import { useMoveBack } from "../../hooks/useMoveBack";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";
import ButtonText from "../../ui/ButtonText";
import BookingDataBox from "./BookingDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import { useBooking } from "./hooks/useBooking";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

export default function BookingDetail(): React.ReactElement {
  const { booking, isLoading } = useBooking();

  const moveBack = useMoveBack() as React.MouseEventHandler<HTMLButtonElement>;

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resource="booking" />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup as="h1">Booking #{booking.id}</HeadingGroup>
        <Tag $type={statusToTagName[booking.status!]}>
          {booking.status!.replace("-", " ")}
        </Tag>
        <ButtonText onClick={moveBack}>&larr;&nbsp;Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}
