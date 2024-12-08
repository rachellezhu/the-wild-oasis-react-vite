import React, { useState } from "react";
import { createGuests, deleteGuests } from "./guestsUploader";
import { createCabins, deleteCabins } from "./cabinsUploader";
import { createBookings, deleteBookings } from "./bookingsUploader";
import Button from "../../ui/Button";

export default function Uploader(): React.ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted first
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created last
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}
