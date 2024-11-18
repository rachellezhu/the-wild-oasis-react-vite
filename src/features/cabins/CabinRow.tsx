import styled from "styled-components";
import { Tables } from "../../types/supabase-type";
import { formatCurrency } from "../../utils/helpers";
import EditCabinForm from "./EditCabinForm";
import { useDeleteCabin } from "./hooks/useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./hooks/useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr repeat(3, 1fr);
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

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
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${cabin.name}`,
      max_capacity: cabin.max_capacity,
      regular_price: cabin.regular_price,
      discount: cabin.discount,
      description: cabin.description,
      image: cabin.image_url!,
    });
  }

  const {
    id: cabinId,
    name,
    max_capacity,
    image_url,
    regular_price,
    discount,
  } = cabin;

  return (
    <>
      <Table.Row>
        <Img src={image_url?.toString()} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {max_capacity} guests</div>
        <Price>{formatCurrency(Number(regular_price))}</Price>
        {discount ? (
          <Discount>{formatCurrency(Number(discount))}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={() => handleDuplicate()} disabled={isCreating}>
            <HiSquare2Stack />
          </button>

          <Modal>
            <Modal.Open opens="edit-cabin">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="edit-cabin">
              <EditCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Open opens="delete-cabin">
              <button>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="delete-cabin">
              <ConfirmDelete
                resourceName="cabin"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}
