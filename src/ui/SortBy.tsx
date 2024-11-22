import React from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

type SortByProps = {
  options: Array<{
    value: string;
    label: string;
  }>;
};

export default function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParam = searchParams.get("sortBy") || undefined;

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      $type="white"
      onChange={(event) => handleChange(event)}
      value={currentParam}
    />
  );
}
