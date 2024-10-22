import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Toast from ".";
import provider from "~/providers/alerts/alerts.provider";
import useObservable from "~/hooks/observable.hook";

jest.mock("~/hooks/observable.hook");
jest.mock("~/providers/alerts/alerts.provider");

describe("components", () => {
    describe("Alerts", () => {
        describe("Toast", () => {
            beforeEach(() => {
                jest.resetAllMocks();
            });
        
            it("should render no toast when alerts are empty", () => {
                (useObservable as jest.Mock).mockReturnValue([]);
                render(<Toast />);
                
                const toastWrapper = screen.queryByTestId("toast-wrapper");
                expect(toastWrapper).toBeNull();
            });
        
            it("should render a toast when alerts are present", () => {
                const alertsMock = [
                    { variant: "success", body: "Test Success Toast", closable: true },
                ];
                (useObservable as jest.Mock).mockReturnValue(alertsMock);
        
                render(<Toast />);
                
                const toastContent = screen.getByText("Test Success Toast");
                expect(toastContent).toBeInTheDocument();
            });
        
            it("should call the close function when the close button is clicked", () => {
                const alertsMock = [
                    { variant: "success", body: "Test Success Toast", closable: true },
                ];
                (useObservable as jest.Mock).mockReturnValue(alertsMock); // Simulate alerts in store
                const removeMock = jest.fn();
                (provider as unknown as jest.Mock).mockReturnValue({ remove: removeMock });
        
                render(<Toast />);
        
                const closeButton = screen.getByTestId("test--toast-close-button");
                fireEvent.click(closeButton);
        
                expect(removeMock).toHaveBeenCalledWith(alertsMock[0]); // Expect close function to be called with correct alert
            });
        });
    });
});
