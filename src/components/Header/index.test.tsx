import * as React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from ".";

describe("components", () => {
    describe("Header", () => {
        it("should render the header", () => {
            render(
                <Header>
                    <h1>Test</h1>
                </Header>
            );
            const header = screen.getByText("Test");

            expect(header).toBeInTheDocument();
        });
    });
});
