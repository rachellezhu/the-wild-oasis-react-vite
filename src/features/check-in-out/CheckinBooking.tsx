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
import { useCheckin } from "./hooks/useCheckin";
import { useSettings } from "../settings/hooks/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

export default function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false);
  const [addBreakfast, setAddBreakfast] = useState<boolean>(false);
  const moveBack = useMoveBack() as React.MouseEventHandler<HTMLButtonElement>;
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(
    function () {
      setConfirmPaid(booking?.is_paid ?? false);
    },
    [booking?.is_paid]
  );

  if (isLoading || isLoadingSettings) return <Spinner />;

  if (!booking || !settings) return <Empty resource="checkin" />;

  const optionalBreakfastPrice =
    settings.breakfast_price! * booking.num_guests! * booking.num_nights!;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId: booking!.id,
        breakfast: {
          has_breakfast: true,
          extras_price: optionalBreakfastPrice,
          total_price: booking!.total_price! + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId: booking!.id });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking.id}</Heading>
        <ButtonText onClick={moveBack}>&larr;&nbsp;Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!booking.has_breakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for&nbsp;
            {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {booking.guests.full_name} has paid the total amount
          of&nbsp;
          {!addBreakfast
            ? formatCurrency(booking.total_price!)
            : `${formatCurrency(
                booking.total_price! + optionalBreakfastPrice
              )} (${formatCurrency(booking.total_price!)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
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
