import React from "react";
import { GetBookingsAfterDateType } from "../../services/apiBookings";
import { Tables } from "../../types/supabase-type";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

type StatsPropsType = {
  bookings: GetBookingsAfterDateType[];
  confirmedStays: Tables<"bookings">[];
  numDays: number;
  cabinCount: number;
};

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: StatsPropsType): React.ReactElement {
  // 1.
  const numBookings = bookings.length;

  // 2.
  const sales = bookings.reduce((acc, cur) => acc + cur.total_price!, 0);

  // 3.
  const checkins = confirmedStays.length;

  // 4.
  // num checked in nights / all available nights
  // (num days * num cabins)
  const occupation =
    (confirmedStays.reduce((acc, cur) => acc + cur.num_nights!, 0) / numDays) *
    cabinCount;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={sales}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100).toString() + "%"}
      />
    </>
  );
}
