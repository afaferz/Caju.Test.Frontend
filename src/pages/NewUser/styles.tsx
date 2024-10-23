import styled from "styled-components";
import { _IconButtonStyled } from "~/components/Buttons/IconButton";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    padding: 1rem;
`;

export const Card = styled.div`
    border: 2px solid #f0f0f0;
    max-width: 500px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 65vw;

    ${_IconButtonStyled} {
        margin-bottom: 8px;
        align-items: flex-start;
    }
`;
