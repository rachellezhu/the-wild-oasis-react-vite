import styled from "styled-components";
import { Tables } from "../../types/supabase-type";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import EditCabinForm from "./EditCabinForm";
import { useDeleteCabin } from "./hooks/useDeleteCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr repeat(3, 1fr);
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

type CabinRowProps = {
  cabin: Tables<"cabins">;
};

export default function CabinRow({ cabin }: CabinRowProps): React.ReactElement {
  const [showForm, setShowForm] = useState<boolean>(false);

  const {
    id: cabinId,
    name,
    max_capacity,
    image_url,
    regular_price,
    discount,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <>
      <TableRow role="row">
        <Img src={image_url?.toString()} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {max_capacity} guests</div>
        <Price>{formatCurrency(Number(regular_price))}</Price>
        <Discount>
          {discount ? formatCurrency(Number(discount)) : <span>&mdash;</span>}
        </Discount>
        <div>
          <button onClick={() => setShowForm((show) => !show)}>Edit</button>
          <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
            Delete
          </button>
        </div>
      </TableRow>

      {showForm && (
        <EditCabinForm
          cabinToEdit={cabin}
          handleCloseForm={() => setShowForm(false)}
        />
      )}
    </>
  );
}
