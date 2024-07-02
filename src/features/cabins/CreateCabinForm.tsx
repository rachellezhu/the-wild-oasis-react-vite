import { useForm } from "react-hook-form";
import { createNewCabin, newCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "react-query";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

export default function CreateCabinForm(): React.ReactElement {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<newCabin>();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: (newCabin: newCabin) => createNewCabin(newCabin),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(data: newCabin) {
    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          {...register("description")}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating}
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* Type is an HTML attibute */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}
