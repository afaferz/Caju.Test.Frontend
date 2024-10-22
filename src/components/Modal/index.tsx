import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import { HiX } from "react-icons/hi";
import Button from "../Buttons";

const _ModalStyled = styled.dialog<{ $open?: boolean }>`
    pointer-events: none;
    transition: opacity 0.5s;
    display: ${(props) => (props.$open ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background: transparent;
    border: none;
    box-sizing: border-box;
    opacity: 0;

    &[open] {
        opacity: 1;
        pointer-events: inherit;
        animation: modal-in 0.5s forwards ease;
    }

    &::backdrop {
        background-color: rgba(0, 0, 0, 0.85);
    }

    @keyframes modal-in {
        from {
            transform: translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

const _ModalContentStyled = styled.div`
    user-select: none;
    max-width: 45vw;
    max-height: 90vh;
    background: white;
    padding: 2.25rem;
    border-radius: 8px;
    position: relative;
    min-width: 40%;
    min-height: 12.5%;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;

    @media screen and (max-width: 600px) {
        min-width: 75%;
        min-height: 25%;
    }
`;

const _ModalCloseButtonStyled = styled(HiX)`
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
`;

const _ModalActionsStyled = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 1.5rem;

    @media screen and (max-width: 600px) {
        justify-content: flex-start;
    }
`;

export const _ModalTitleStyled = styled.h3`
    font-size: 1.5rem;
    font-weight: bold;
    color: #0d0d0d;
    margin-bottom: 10px;
    margin-top: 0;
`;
export const _ModalSubtitleStyled = styled.p`
    font-size: 1rem;
    font-weight: bold;
    color: #ccc;
    margin: 0 auto;
`;

type ModalProps = {
    open: boolean;
    children?: React.ReactNode;
    $loading?: boolean;
    $cancel?: () => void;
    $confirm?: () => void;
} & React.HTMLAttributes<HTMLDialogElement>;

const Modal = React.memo((props: ModalProps) => {
    const { open, children, $loading, $cancel, $confirm } = props;
    const ref = React.useRef<HTMLDialogElement | null>(null);

    React.useEffect(() => {
        const dialog = ref.current;
        if (dialog) {
            if (open) {
                dialog.showModal();
                document.body.style.overflow = "hidden";
            } else {
                dialog.close();
                document.body.style.overflow = "";
            }
        }
    }, [open]);

    const close = () => {
        const dialog = ref.current;
        if (dialog) {
            dialog.close();
        }
    };

    return ReactDOM.createPortal(
        <_ModalStyled ref={ref} $open={open}>
            <_ModalContentStyled>
                <_ModalCloseButtonStyled
                    aria-label="Fechar"
                    data-testid="test--modal-close-button"
                    onClick={() => {
                        close();
                        $cancel && $cancel();
                    }}
                />
                {children}
                <_ModalActionsStyled>
                    <Button
                        $color="rgb(255, 145, 154)"
                        $rounded
                        $disabled={$loading}
                        $loading={$loading}
                        $minWidth={"175px"}
                        $click={() => $cancel && $cancel()}
                        data-testid="test--modal-cancel-btn"
                    >
                        Cancelar
                    </Button>
                    <Button
                        $color="rgb(155, 229, 155)"
                        $rounded
                        $loading={$loading}
                        $disabled={$loading}
                        $minWidth={"175px"}
                        $click={() => $confirm && $confirm()}
                        data-testid="test--modal-confirm-btn"
                    >
                        Confirmar
                    </Button>
                </_ModalActionsStyled>
            </_ModalContentStyled>
        </_ModalStyled>,
        document.body
    );
});

export default Modal;
