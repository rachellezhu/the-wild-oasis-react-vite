import React from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import { filterOptions, sortOptions } from "./options";

export default function CabinTableOperations(): React.ReactElement {
  return (
    <TableOperations>
      <Filter filterField="discount" options={filterOptions} />

      <SortBy options={sortOptions} />
    </TableOperations>
  );
}
