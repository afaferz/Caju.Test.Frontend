import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import DashboardPage from ".";
import provider from "~/providers/registrations/registrations.provider";
import store from "~/store/registrations/registrations.store";
import useObservable from "~/hooks/observable.hook";

jest.mock("~/providers/registrations/registrations.provider");
jest.mock("~/store/registrations/registrations.store");
jest.mock("~/hooks/observable.hook");

jest.mock("./components/Searchbar", () => ({
    __esModule: true,
    default: () => <div />,
}));
describe("pages", () => {
    const mockRegistrations = [
        { id: 1, name: "Registration 1" },
        { id: 2, name: "Registration 2" },
    ];
    beforeAll(() => {
        window.HTMLDialogElement.prototype.showModal = jest.fn();
        window.HTMLDialogElement.prototype.close = jest.fn();
    });
    beforeEach(() => {
        (store as unknown as jest.Mock).mockReturnValue({
            registrations: mockRegistrations,
        });

        (useObservable as jest.Mock).mockReturnValue(mockRegistrations);

        (provider as unknown as jest.Mock).mockReturnValue({
            getAllRegistrations: jest.fn(),
        });
    });
    describe("Dashboard", () => {
        it("should fetch registrations on mount and render them", async () => {
            const { getAllRegistrations } = provider();

            render(<DashboardPage />);

            await waitFor(() => {
                expect(getAllRegistrations).toHaveBeenCalledTimes(1);
            });

            mockRegistrations.forEach(async (registration) => {
                await waitFor(() => {
                    expect(
                        screen.getByText(registration.name)
                    ).toBeInTheDocument();
                });
            });
        });
    });
});
