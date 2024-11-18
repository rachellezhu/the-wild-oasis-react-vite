import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./hooks/useCabins";
import Table from "../../ui/Table";
import { Tables } from "../../types/supabase-type";
// import { getProperty } from "../../utils/helpers";

export default function CabinTable(): React.ReactElement {
  const { isLoading, cabins } = useCabins();

  // const cabin1 = cabins!.at(0)!;

  // const property = getProperty(cabin1, "name");
  // console.log(property);

  if (isLoading) return <Spinner />;

  return (
    <Table $columns="0.6fr 1.8fr 2.2fr repeat(3, 1fr)">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={cabins}
        render={(cabin: Tables<"cabins">) => (
          <CabinRow cabin={cabin} key={cabin.id} />
        )}
      />
    </Table>
  );
}
