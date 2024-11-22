import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./hooks/useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { filterOptions } from "./options";
import { Tables } from "../../types/supabase-type";

export default function CabinTable(): React.ReactElement {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";
  const sortValue = searchParams.get("sortBy") || "name-asc";

  let filteredCabins;

  switch (filterValue) {
    case filterOptions.at(0)?.value:
      filteredCabins = cabins;
      break;
    case filterOptions.at(1)?.value:
      filteredCabins = cabins?.filter((cabin) => !cabin.discount);
      break;
    case filterOptions.at(2)?.value:
      filteredCabins = cabins?.filter(
        (cabin) => cabin.discount !== null && cabin.discount > 0
      );
  }

  const [field, direction] = sortValue.split("-") as [
    keyof Tables<"cabins">,
    string
  ];
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort((a, b) => {
    const x = a[field] !== null ? a[field] : 0;
    const y = b[field] !== null ? b[field] : 0;

    if (typeof x === "string" || typeof y === "string")
      return x.toLocaleString().localeCompare(y.toLocaleString()) * modifier;

    return (x - y) * modifier;
  });

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table $columns="1fr 1.8fr 2.2fr repeat(3, 1fr)">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
