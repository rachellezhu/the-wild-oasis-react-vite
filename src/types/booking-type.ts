import { Tables } from "./supabase-type";

export type CabinType = {
  cabins: Tables<"cabins">;
};

export type GuestType = {
  guests: Tables<"guests">;
};

export type StatusType = {
  status?: "unconfirmed" | "checked-in" | "checked-out";
};

export type BookingType = CabinType &
  GuestType &
  StatusType & {
    [Property in keyof Tables<"bookings"> as Exclude<
      Property,
      "status"
    >]: Tables<"bookings">[Property];
  };

export type UpdateBookingType = {
  [Property in keyof Tables<"bookings"> as Exclude<
    Property,
    "id" & "created_at"
  >]?: Tables<"bookings">[Property];
};
