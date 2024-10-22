import styled from "styled-components";
const registrationStatusStyles: {
    [key in string]: { background: string; title: string };
} = {
    REVIEW: {
        background: "#FDF8E9",
        title: "#EFC24D",
    },
    APPROVED: {
        background: "#EEEEFD",
        title: "#4242DF",
    },
    REPROVED: {
        background: "#FBEDF6",
        title: "#CE2893",
    },
};

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
    justify-content: center;
    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(3, 1fr);
    }
`;

export const Column = styled.div<{ status: any }>`
    height: auto;
    background-color: ${({ status }) =>
        registrationStatusStyles[status].background};
    border-radius: 32px;
    min-height: 80vh;
    max-height: 80vh;
    padding-bottom: 1.35rem;
    overflow-y: hidden;
    box-sizing: border-box;
    @media screen and (max-width: 768px) {
        max-height: 45vh;
        min-height: fit-content;
    }
`;

export const TitleColumn = styled.h3<{ status: any }>`
    margin: 0px;
    color: ${({ status }) => registrationStatusStyles[status].title};
    margin: 24px;
`;

export const CollumContent = styled.div`
    overflow: auto;
    max-height: 85%;
    overflow-y: scroll;
`;

export const CollumSubtitle = styled.span`
    color: #ccc;
    font-weight: bold;
    font-size: 0.95rem;
    display: block;
    margin-inline: 24px;
`;
