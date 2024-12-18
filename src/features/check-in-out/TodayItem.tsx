import React from "react";
import styled from "styled-components";
import { TodayActivityType } from "../../services/apiBookings";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Checkin from "../../pages/Checkin";
import CheckoutButton from "./CheckoutButton";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

type TodayItemPropsType = {
  activity: TodayActivityType;
};

export default function TodayItem({
  activity,
}: TodayItemPropsType): React.ReactElement {
  const { id, status, num_nights, guests } = activity;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag $type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag $type="blue">Departing</Tag>}

      <Flag src={guests.country_flag!} alt={`Flag of ${guests.nationality}`} />
      <Guest>{guests.full_name}</Guest>
      <div>{num_nights}&nbsp;nights</div>
      {status === "unconfirmed" && (
        <Button
          $variation="primary"
          $size="small"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}
