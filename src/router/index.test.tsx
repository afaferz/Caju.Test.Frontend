import * as React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Router from ".";
import routes from "./routes";

jest.mock("~/pages/Dashboard", () => ({
    __esModule: true,
    default: () => <div>Dashboard Page</div>,
}));

const renderWithRoute = (route: string) => {
    render(
        <MemoryRouter initialEntries={[route]}>
            <Router />
        </MemoryRouter>
    );
};


describe("router", () => {
    afterEach(() => {
        cleanup();
    });
    it("should render the Dashboard page on /dashboard route", async () => {
        renderWithRoute(routes.dashboard);
        expect(await screen.findByText(/dashboard page/i)).toBeInTheDocument();
    });
});
