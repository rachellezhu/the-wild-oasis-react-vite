import React from "react";
import Button from "../../ui/Button";
import { useCheckout } from "./hooks/useCheckout";
import { Tables } from "../../types/supabase-type";

export default function CheckoutButton({
  bookingId,
}: {
  bookingId: Tables<"bookings">["id"];
}): React.ReactElement {
  const { checkout, isCheckingOut } = useCheckout();
  return (
    <Button
      $size="small"
      $variation="primary"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}
