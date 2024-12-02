import { Tables } from "../types/supabase-type";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

type UpdateBookingType = {
  [Property in keyof Tables<"bookings"> as Exclude<
    Property,
    "id" & "created_at"
  >]?: Tables<"bookings">[Property];
};

export async function getBookings(): Promise<Tables<"bookings">[]> {
  const { data, error } = await supabase.from("bookings").select("*");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return data;
}

export async function getBooking(id: number): Promise<Tables<"bookings">> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
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

export async function deleteBooking(id: number): Promise<Tables<"bookings">> {
  // REMEMBER RLS POLICIES

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  return data;
}
