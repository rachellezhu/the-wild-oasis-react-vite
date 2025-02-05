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
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  margin: auto;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  text-align: left;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
  text-align: right;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
  text-align: right;
`;

type CabinRowProps = {
  cabin: Tables<"cabins">;
};

export default function CabinRow({ cabin }: CabinRowProps): React.ReactElement {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

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
    <Table.Row>
      <Img src={image_url?.toString()} />
      <Cabin>{name}</Cabin>
      <div style={{ textAlign: "left" }}>Fits up to {max_capacity} guests</div>
      <Price>{formatCurrency(Number(regular_price))}</Price>
      {discount ? (
        <Discount>{formatCurrency(Number(discount))}</Discount>
      ) : (
        <span style={{ textAlign: "right" }}>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId.toString()} />

            <Menus.List id={cabinId.toString()}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={() => handleDuplicate()}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit-cabin">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete-cabin">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="edit-cabin">
            <EditCabinForm cabinToEdit={cabin} />
          </Modal.Window>

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
  );
}
