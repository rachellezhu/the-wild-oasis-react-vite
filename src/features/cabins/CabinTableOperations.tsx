import React from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

export default function CabinTableOperations(): React.ReactElement {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
    </TableOperations>
  );
}
