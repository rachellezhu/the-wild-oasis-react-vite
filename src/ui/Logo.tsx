import React from "react";
import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

export default function Logo(): React.ReactElement {
  return (
    <StyledLogo>
      <Img src="img/logo-light.png" alt="Logo" />
    </StyledLogo>
  );
}
