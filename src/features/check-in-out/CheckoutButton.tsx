import React from "react";
import Button from "../../ui/Button";

export default function CheckoutButton({ bookingId }): React.ReactElement {
  return (
    <Button $size="small" $variation="primary">
      Check out
    </Button>
  );
}
