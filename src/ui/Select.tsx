import React from "react";
import styled from "styled-components";

type StyledSelectProps = {
  $type?: "white";
};

type SelectProps = StyledSelectProps & {
  options: Array<{
    label: string;
    value: string;
  }>;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.$type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};

  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

export default function Select({
  onChange,
  $type,
  options,
  value,
}: SelectProps): React.ReactElement {
  return (
    <StyledSelect onChange={onChange} $type={$type} value={value}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}
