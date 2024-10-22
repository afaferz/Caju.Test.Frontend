import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import If from ".";

describe("Ifs", () => {
    describe("Common", () => {
        describe("If", () => {
            test("should render children when test prop is true", () => {
                render(
                    <If test={true}>
                        <span>Test Child</span>
                    </If>
                );

                const child = screen.getByText("Test Child");
                expect(child).toBeInTheDocument();
            });

            test("should not render children when test prop is false", () => {
                render(
                    <If test={false}>
                        <span>Test Child</span>
                    </If>
                );

                const child = screen.queryByText("Test Child");
                expect(child).not.toBeInTheDocument();
            });

            test("should not render children when test prop is undefined", () => {
                render(
                    <If test={undefined}>
                        <span>Test Child</span>
                    </If>
                );

                const child = screen.queryByText("Test Child");
                expect(child).not.toBeInTheDocument();
            });
        });
    });
});
