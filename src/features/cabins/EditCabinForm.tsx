import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { NewCabinType } from "../../services/apiCabins";
import { Tables } from "../../types/supabase-type";
import { useUpdateCabin } from "./hooks/useUpdateCabin";

type EditCabinFormProps = {
  onCloseModal?: () => void;
  cabinToEdit: Tables<"cabins">;
};

export default function EditCabinForm({
  onCloseModal,
  cabinToEdit,
}: EditCabinFormProps): React.ReactElement {
  const { isUpdating, updateCabin } = useUpdateCabin();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isDirty, errors },
  } = useForm<NewCabinType>({
    defaultValues: {
      name: cabinToEdit!.name!,
      max_capacity: cabinToEdit!.max_capacity!,
      regular_price: cabinToEdit!.regular_price!,
      discount: cabinToEdit!.discount!,
      description: cabinToEdit!.description,
      image: cabinToEdit!.image_url!,
    },
  });

  const isWorking = isUpdating;

  function onSubmit(data: NewCabinType) {
    updateCabin(
      { cabin: data, id: cabinToEdit!.id },
      {
        onSuccess: onCloseModal,
        onError: () => {
          reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          disabled={isWorking}
          {...register("max_capacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          disabled={isWorking}
          {...register("regular_price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required",
            validate: (value: number | null) =>
              Number(value!) < Number(getValues().regular_price!) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description form website"
        error={errors.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description")}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <div>
          <FileInput
            id="image"
            accept="image/*"
            disabled={isWorking}
            {...register("image", {
              required: false,
            })}
          />
          {
            <img
              style={{ marginTop: "1rem" }}
              src={cabinToEdit!.image_url!}
              alt="image"
            />
          }
        </div>
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button disabled={isWorking || !isDirty}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}
