import React from "react";
import styled from "styled-components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import { useTodayActivity } from "../dashboard/hooks/useTodayActivity";
import { format } from "date-fns";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and, ms, respectively; */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

export default function TodayActivity(): React.ReactElement {
  const { today, todayActivity, checkins, checkouts } = useTodayActivity();

  console.log(`today activity: ${todayActivity?.at(0)}`);
  console.log(`check-in: ${checkins || 0}`);
  console.log(`check-out: ${checkouts || 0}`);
  console.log(`date today: ${format(new Date(today), "MMM dd yyyy")}`);

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>
    </StyledToday>
  );
}
