import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/hooks/useBooking";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import ButtonText from "../../ui/ButtonText";
import BookingDataBox from "../bookings/BookingDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./hooks/useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

export default function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false);
  const moveBack = useMoveBack() as React.MouseEventHandler<HTMLButtonElement>;
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useChecking();

  useEffect(
    function () {
      setConfirmPaid(booking?.is_paid ?? false);
    },
    [booking?.is_paid]
  );

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resource="checkin" />;

  function handleCheckin() {
    if (!confirmPaid) return;

    checkin(booking!.id);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking.id}</Heading>
        <ButtonText onClick={moveBack}>&larr;&nbsp;Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {booking.guests.full_name} has paid the total amount of{" "}
          {formatCurrency(booking.total_price!)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{booking.id}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}
