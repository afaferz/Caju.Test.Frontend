import * as React from "react";
import { render, screen } from "@testing-library/react";
import TextField from ".";

describe("components", () => {
    describe("TextField", () => {
        it("should renders input with label", () => {
            render(<TextField label="Label" id="test-input" />);

            const label = screen.getByText("Label");
            expect(label).toBeInTheDocument();

            const input = screen.getByTestId("test--input");
            expect(input).toBeInTheDocument();
        });

        it("should renders input without label", () => {
            render(<TextField />);

            const input = screen.getByTestId("test--input");
            expect(input).toBeInTheDocument();

            const label = screen.queryByText(/Label/i);
            expect(label).not.toBeInTheDocument();
        });

        it("should renders input with error message", () => {
            render(
                <TextField
                    label="Label"
                    error="Error message."
                    id="test-input"
                />
            );

            // Verifica se a mensagem de erro está no documento
            const errorMessage = screen.getByText("Error message.");
            expect(errorMessage).toBeInTheDocument();
        });

        it("should input has correct block style", () => {
            const { container } = render(<TextField $block={true} />);

            const input = container.querySelector("input");
            expect(input).toHaveStyle("width: 100%");
        });

        it("should input has correct default style", () => {
            const { container } = render(<TextField $block={false} />);

            const input = container.querySelector("input");
            expect(input).toHaveStyle("width: max-content");
        });
    });
});
