import React from "react";
import styled from "styled-components";
import { useUser } from "./hooks/useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  height: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

export default function UserAvatar() {
  const { user } = useUser();
  const { avatar, full_name } = user?.user_metadata as {
    avatar: string | undefined;
    full_name: string | undefined;
  };

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || "/img/default-user.jpg"}
        alt={`Avatar of ${full_name || "user"}`}
      />
      <span>{full_name || "User"}</span>
    </StyledUserAvatar>
  );
}
