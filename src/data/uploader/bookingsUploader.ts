import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../../services/supabase";
import { substractDates } from "../../utils/helpers";
import { bookings } from "../data-bookings";
import { cabins } from "../data-cabins";

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);

  if (error) console.error(error.message);
}

async function createBookings() {
  // Bookings need a guest_id and a cabin_id. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guest_ids and cabin_ids, and then replace the original IDs in the booking data with the actual ones from the DB

  const { data: guestIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");

  const allGuestIds = guestIds?.map((guest) => guest.id);

  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");

  const allCabinIds = cabinsIds?.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabin_id! - 1);
    const num_nights = substractDates(booking.end_date!, booking.start_date!);
    const cabin_price = num_nights * (cabin!.regular_price! - cabin!.discount!);
    const extras_price = booking.has_breakfast
      ? num_nights * 15 * booking.num_guests!
      : 0;
    const total_price = cabin_price + extras_price;

    let status;

    if (
      isPast(new Date(booking.end_date!)) &&
      !isToday(new Date(booking.end_date!))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.start_date!)) ||
      isToday(new Date(booking.start_date!))
    )
      status = "unconfirmed";
    if (
      isFuture(new Date(booking.end_date!)) ||
      (isToday(new Date(booking.end_date!)) &&
        isPast(new Date(booking.start_date!)) &&
        !isToday(new Date(booking.start_date!)))
    )
      status = "checked-in";

    return {
      ...booking,
      num_nights,
      cabin_price,
      extras_price,
      total_price,
      guest_id: allGuestIds?.at(booking.guest_id! - 1),
      cabin_id: allCabinIds?.at(booking.cabin_id! - 1),
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);

  if (error) console.error(error.message);
}

export { deleteBookings, createBookings };
