import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { BookingType, UpdateBookingType } from "../types/booking-type";
import { Tables } from "../types/supabase-type";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

type GetBookingsParamsType = {
  filter?: { field: string; value: string } | null;
  sortBy?: { field: string; direction: string } | null;
  page?: number;
};

export type GetBookingsType = {
  data: BookingType[];
  count: number | null;
};

export async function getBookings({
  filter,
  sortBy,
  page,
}: GetBookingsParamsType): Promise<GetBookingsType> {
  let query = supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)", { count: "exact" });

  if (filter) query = query.eq(filter.field, filter.value);

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = (await query) as PostgrestSingleResponse<
    BookingType[]
  >;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

export async function getBooking(id: number): Promise<BookingType> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .returns<BookingType>()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all STAYS that we are were created after the given data
export async function getStaysAfterDate(
  date: string
): Promise<Tables<"bookings">[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name)")
    .gte("start_date", date)
    .lte("start_date", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity(): Promise<Tables<"bookings">[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name, nationality, country_flag)")
    .or(
      `and(status.eq.unconfirmed,start_date.eq.${getToday()}),and(status.eq.checked-in,end_date.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.start_date))) ||
  // (stay.status === 'check-in' && isToday(new Date(stay.end_date)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function updateBooking(
  id: number,
  obj: UpdateBookingType
): Promise<Tables<"bookings">> {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not updated");
  }

  return data;
}

export async function deleteBooking(id: number): Promise<null> {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  return data;
}
