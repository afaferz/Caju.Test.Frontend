import React from "react";
import styled from "styled-components";
import { Spinner } from "../Spinner";

const _ButtonStyled = styled.button<{
    color?: string;
    disabled?: boolean;
    loading?: boolean;
    minWidth?: string | number;
    width?: string | number;
    block?: boolean;
}>`
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 36px;
    padding: 8px 32px;
    background-color: ${(props) => props.color ?? "none"};
    cursor: pointer;
    height: 56px;
    color: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    font-size: 16px;
    font-weight: 600;
    pointer-events: auto;
    min-width: ${(props) => props.minWidth ?? "auto"};
    width: ${(props) =>
        props.width ? props.width : props.block ? "100%" : "auto"};

    &.disabled,
    &.loading {
        background-color: #ccc !important;
        cursor: not-allowed;
        pointer-events: none;
    }
`;

export const ButtonSmall = styled.button<{
    bgcolor?: string;
    color?: string;
}>`
    font-size: 12px;
    outline: none;
    border-radius: 4px;
    border: none;
    padding: 4px 16px;
    background-color: ${(props) => props.bgcolor ?? "none"};
    color: ${(props) => props.color ?? "#000"};
    cursor: pointer;
`;

type ButtonProps = {
    children?: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    color?: string;
    minWidth?: string | number;
    width?: string | number;
    block?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

const _Button = React.memo((props: ButtonProps) => {
    const { children, disabled, loading, onClick } = props;

    const classNames = [];
    if (disabled) classNames.push("disabled");
    if (loading) classNames.push("loading");

    const click$1 = (event: React.MouseEvent<HTMLButtonElement>) => {
        if ((!disabled || !loading) && onClick) {
            onClick(event);
        }
    };

    return (
        <_ButtonStyled
            className={classNames.join(" ")}
            onClick={click$1}
            {...props}
        >
            {loading ? <Spinner /> : children}
        </_ButtonStyled>
    );
});

export default _Button;
