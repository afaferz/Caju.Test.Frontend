import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from ".";

describe("components", () => {
    describe("Buttons", () => {
        it("Should show button", () => {
            render(<Button>Ativar</Button>);
            expect(screen.getByRole("button", { name: /ativar/i }));
        });
        it("should active function on click", () => {
            const clickFn = jest.fn();
            render(<Button $click={clickFn}>Ativar</Button>);
            const button = screen.getByRole("button", { name: /ativar/i });
            fireEvent.click(button);
            expect(clickFn).toHaveBeenCalled();
        });
        it("should have spinner and classes", () => {
            const props = {
                $loading: true,
                $disabled: true,
                $variant: "medium" as any,
                $width: "100%",
            };
            render(<Button {...props}>Ativar</Button>);
            const button = screen.getByTestId("test--button");
            const spinner = screen.getByTestId("test--spinner");
            expect(button!.classList.contains("loading")).toBeTruthy();
            expect(button!.classList.contains("disabled")).toBeTruthy();
            expect(button!.classList.contains("--medium")).toBeTruthy();
            expect(spinner).toBeInTheDocument();
        });
        it("should disable click events", () => {
            const clickFn = jest.fn();
            render(
                <Button $click={clickFn} $disabled $block>
                    Ativar
                </Button>
            );
            const button = screen.getByRole("button", { name: /ativar/i });
            fireEvent.click(button);
            expect(clickFn).not.toHaveBeenCalled();
        });
    });
});
