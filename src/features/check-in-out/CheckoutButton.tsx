import React from "react";
import Button from "../../ui/Button";

export default function CheckoutButton({ bookingId }) {
  return (
    <Button $size="small" $variation="primary">
      Check out
    </Button>
  );
}
