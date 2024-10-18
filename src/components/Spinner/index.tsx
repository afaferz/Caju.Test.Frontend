import React from "react";
import styled from "styled-components";

const _Spinner = styled.span`
    width: 1.75rem;
    height: 1.75rem;
    border: 5px solid #FFF;
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
`;

const Spinner = React.memo(() => <_Spinner />);

export { Spinner };
