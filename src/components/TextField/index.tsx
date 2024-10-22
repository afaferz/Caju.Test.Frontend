import * as React from "react";
import styled from "styled-components";

const _Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: auto;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;
export const _Input = styled.input<{ $block?: boolean }>`
    padding: 0 8px;
    vertical-align: middle;
    border-radius: 2px;
    width: ${(props) => (props.$block ? "100%" : "max-content")};
    min-height: 36px;
    background-color: #ffffff;
    border: 1px solid rgba(36, 28, 21, 0.3);
    transition: all 0.2s ease-in-out 0s;
    font-size: 16px;
    line-height: 18px;
    font-weight: normal;
    border-radius: 8px;
    margin: 6px 0;
    display: flex;
    box-sizing: border-box;
    :focus {
        outline: none;
        border: 1px solid #007c89;
        box-shadow: inset 0 0 0 1px #007c89;
    }
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;
type Props = {
    label?: string;
    error?: string;
    $block?: boolean;
} & React.InputHTMLAttributes<any>;

const TextField = React.memo((props: Props) => {
    const { label, error, id, $block } = props;
    return (
        <_Container>
            {label ? <label htmlFor={id}>{label}</label> : <></>}
            <_Input $block={$block} {...props} data-testid="test--input" />
            {error ? (
                <span style={{ fontSize: 12, color: "red" }}>{error}</span>
            ) : (
                <></>
            )}
        </_Container>
    );
});

export default TextField;
