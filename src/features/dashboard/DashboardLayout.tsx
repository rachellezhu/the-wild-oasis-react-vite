import React from "react";
import styled from "styled-components";
import { useRecentBookings } from "./hooks/useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./hooks/useRecentStays";
import Stats from "./Stats";
import Empty from "../../ui/Empty";
import { useCabins } from "../cabins/hooks/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout(): React.ReactElement {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const {
    stays,
    isLoading: isLoadingStays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  if (!bookings || !confirmedStays || !cabins) return <Empty resource="data" />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}
