import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./hooks/useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

export default function CabinTable(): React.ReactElement {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;

  switch (filterValue) {
    case "all":
      filteredCabins = cabins;
      break;
    case "no-discount":
      filteredCabins = cabins?.filter((cabin) => !cabin.discount);
      break;
    case "with-discount":
      filteredCabins = cabins?.filter(
        (cabin) => cabin.discount !== null && cabin.discount > 0
      );
  }

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
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
