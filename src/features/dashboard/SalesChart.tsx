import React from "react";
import styled from "styled-components";

const StyledSalesChart = styled.div`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

export default function SalesChart() {
  return <div>SalesChart</div>;
}
