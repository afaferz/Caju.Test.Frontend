import * as React from "react";
import styled from "styled-components";

const _Spinner = styled.span<{ color?: string }>`
    width: 1.55em;
    height: 1.55em;
    border: 5px solid ${(props) => props.color ?? "#fff"};
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

type SpinnerProps = {
    color?: string;
};

const Spinner = React.memo((props: SpinnerProps) => (
    <_Spinner
        aria-label="Carregando..."
        data-testid="test--spinner"
        {...props}
    />
));

export default Spinner;
