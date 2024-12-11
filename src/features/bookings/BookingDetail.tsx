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
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/hooks/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./hooks/useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

export default function BookingDetail(): React.ReactElement {
  const { booking, isLoading } = useBooking();
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
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

      <Modal>
        <ButtonGroup>
          <Button $variation="secondary" onClick={moveBack}>
            Back
          </Button>

          {booking.status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${booking.id}`)}>
              Check in
            </Button>
          )}

          {booking.status === "checked-in" && (
            <Button
              onClick={() => checkout(booking.id)}
              disabled={isCheckingOut}
            >
              Check out
            </Button>
          )}

          <Modal.Open opens="delete-booking">
            <Button $variation="danger">Delete</Button>
          </Modal.Open>
        </ButtonGroup>

        <Modal.Window name="delete-booking">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() =>
              deleteBooking(booking.id, {
                onSettled: () => navigate(-1),
              })
            }
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}
