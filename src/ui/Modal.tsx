import React, {
  cloneElement,
  createContext,
  Dispatch,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useCloseModal } from "../hooks/useCloseModal";

type WindowProps = {
  children: React.ReactElement;
  name: string;
};

type OpenProps = {
  children: React.ReactElement;
  opens: string;
};

type ModalProviderProps = {
  openName: string;
  open: Dispatch<React.SetStateAction<ModalProviderProps["openName"]>>;
  close: () => void;
};

const StyledModal = styled.div<{ ref: React.MutableRefObject<unknown> }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-ld);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500) */
    /* stroke: var(--color-grey-500) */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext<ModalProviderProps>({
  openName: "",
  open: () => "",
  close,
});

function Modal({ children }: React.PropsWithChildren): React.ReactElement {
  const [openName, setOpenName] = useState<ModalProviderProps["openName"]>("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }: OpenProps): React.ReactElement {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ children, name }: WindowProps): React.ReactElement | null {
  const { openName, close } = useContext(ModalContext);
  const ref = useCloseModal(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
