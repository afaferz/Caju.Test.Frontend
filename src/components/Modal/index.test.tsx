import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from ".";

describe("components", () => {
    describe("Modal", () => {
        const cancelFn = jest.fn();
        const confirmFn = jest.fn();
        beforeEach(() => {
            jest.clearAllMocks();
        });
        beforeAll(() => {
            window.HTMLDialogElement.prototype.showModal = jest.fn();
            window.HTMLDialogElement.prototype.close = jest.fn();
        });

        it("should renders modal when open is true", () => {
            render(
                <Modal open={true} $cancel={cancelFn} $confirm={confirmFn}>
                    Test Modal Content
                </Modal>
            );

            expect(screen.getByText("Test Modal Content")).toBeInTheDocument();
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });

        it("should not render modal when open is false", () => {
            render(
                <Modal open={false} $cancel={cancelFn} $confirm={confirmFn}>
                    Test Modal Content
                </Modal>
            );

            const component = screen.queryByText("Test Modal Content");

            expect(component).toBeInTheDocument();
            const dialog = document.querySelector("dialog");
            expect(dialog).toHaveStyle("display: none");
        });

        it("should call $cancel function when Cancel button is clicked", () => {
            render(
                <Modal open={true} $cancel={cancelFn} $confirm={confirmFn}>
                    Test Modal Content
                </Modal>
            );

            const cancelBtn = screen.getByText("Cancelar");
            fireEvent.click(cancelBtn);

            expect(cancelFn).toHaveBeenCalled();
        });

        it("should call $confirm function when Confirm button is clicked", () => {
            render(
                <Modal open={true} $cancel={cancelFn} $confirm={confirmFn}>
                    Test Modal Content
                </Modal>
            );

            const confirmBtn = screen.getByText("Confirmar");
            fireEvent.click(confirmBtn);

            expect(confirmFn).toHaveBeenCalled();
        });

        it("should call $cancel function when close button is clicked", () => {
            render(
                <Modal open={true} $cancel={cancelFn} $confirm={confirmFn}>
                    Test Modal Content
                </Modal>
            );

            const closeBtn = screen.getByTestId("test--modal-close-button");
            fireEvent.click(closeBtn);

            expect(cancelFn).toHaveBeenCalled();
        });
    });
});
