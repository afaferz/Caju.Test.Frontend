import * as React from "react";
import styled from "styled-components";
import Spinner from "../Spinner";

const _ButtonStyled = styled.button<{
    $color?: string;
    $disabled?: boolean;
    $loading?: boolean;
    $minWidth?: string | number;
    $width?: string | number;
    $block?: boolean;
    $rounded?: boolean;
}>`
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: ${(props) => (props.$rounded ? ".5rem" : "0px")};
    padding: 4px 16px;
    background-color: ${(props) => props.$color ?? "none"};
    cursor: pointer;
    color: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    font-size: 16px;
    font-weight: 600;
    pointer-events: auto;
    min-width: ${(props) => props.$minWidth ?? "auto"};
    width: ${(props) =>
        props.$width ? props.$width : props.$block ? "100%" : "auto"};

    &.disabled,
    &.loading {
        background-color: #ccc !important;
        cursor: not-allowed;
        pointer-events: none;
    }
    &.--small {
        font-size: 12px;
        padding: 4px 16px;
        height: 24px;
    }
    &.--medium {
        height: 36px;
    }
    &.--large {
        height: 48px;
    }
`;

type ButtonProps = {
    children?: React.ReactNode;
    $loading?: boolean;
    $disabled?: boolean;
    $color?: string;
    $minWidth?: string | number;
    $width?: string | number;
    $block?: boolean;
    $variant?: "small" | "medium" | "large";
    $rounded?: boolean;
    $click?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} & React.HTMLAttributes<HTMLButtonElement>;

const Button = React.memo((props: ButtonProps) => {
    const { children, $disabled, $variant, $loading, $click } = props;

    const classNames = [""];
    if ($disabled) classNames.push("disabled");
    if ($loading) classNames.push("loading");
    if ($variant) classNames.push(`--${$variant}`);

    const click$1 = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!$disabled && !$loading && $click) $click(event);
    };

    return (
        <_ButtonStyled
            className={classNames.join(" ")}
            onClick={click$1}
            data-testid="test--button"
            {...props}
        >
            {$loading ? <Spinner /> : children}
        </_ButtonStyled>
    );
});

export default Button;
