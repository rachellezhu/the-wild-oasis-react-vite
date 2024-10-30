import React from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./hooks/useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./hooks/useUpdateSetting";

export default function UpdateSettingsForm(): React.ReactElement {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleUpdate(
    event: React.FocusEvent<HTMLInputElement>,
    field:
      | "min_booking_length"
      | "max_booking_length"
      | "max_guests_per_booking"
      | "breakfast_price"
  ) {
    const oldValue = settings![field];
    const { value } = event.target;

    if (!value) return;
    if (oldValue === Number(value)) return;

    updateSetting({ [field]: Number(value) });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={Number(settings?.min_booking_length)}
          onBlur={(event) => handleUpdate(event, "min_booking_length")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={Number(settings?.max_booking_length)}
          onBlur={(event) => handleUpdate(event, "max_booking_length")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={Number(settings?.max_guests_per_booking)}
          onBlur={(event) => handleUpdate(event, "max_guests_per_booking")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={Number(settings?.breakfast_price)}
          onBlur={(event) => handleUpdate(event, "breakfast_price")}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}
