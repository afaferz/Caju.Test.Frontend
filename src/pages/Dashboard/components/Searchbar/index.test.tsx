import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import SearchBar from ".";
import make_sut from "~/helpers/make-sut";
import registrationsProvider from "~/providers/registrations/registrations.provider";
import { useHistory } from "react-router-dom";
import registrationStore from "~/store/registrations/registrations.store";

jest.mock("react-router-dom", () => ({
    useHistory: jest.fn(),
}));

describe("pages", () => {
    describe("Dashboard", () => {
        describe("components", () => {
            describe("SearchBar", () => {
                it("should render correctly", () => {
                    const { render } = make_sut(<SearchBar />);
                    render("/");
                    const component = screen.getByTestId("test--search-bar");

                    expect(component).toBeInTheDocument();
                    // expect(component).toMatchSnapshot();
                });
                it("should input value for document search", () => {
                    const { render } = make_sut(<SearchBar />);
                    render("/");
                    const input = screen.getByTestId(
                        "test--input"
                    ) as HTMLInputElement;
                    fireEvent.change(input, {
                        target: { value: "999999999999" },
                    });
                    expect(input.value).toBe("999.999.999-99");
                });
                it("should find when input is valid", () => {
                    const searchFn = jest.spyOn(
                        registrationsProvider(),
                        "getRegistrationByFilter"
                    );
                    const { render } = make_sut(<SearchBar />);
                    render("/");
                    const input = screen.getByTestId(
                        "test--input"
                    ) as HTMLInputElement;
                    fireEvent.change(input, {
                        target: { value: "78502270001" },
                    });
                    expect(searchFn).toHaveBeenCalledWith({
                        cpf: "78502270001",
                    });
                });
                it("should refetch items when button was clicked", () => {
                    const refetchFn = jest.spyOn(
                        registrationsProvider(),
                        "getAllRegistrations"
                    );
                    const { render } = make_sut(<SearchBar />);
                    render("/");
                    const button = screen.getByRole("button", {
                        name: /refetch/i,
                    });
                    fireEvent.click(button);
                    expect(refetchFn).toHaveBeenCalled();
                });
                it("should redirect to admission page", () => {
                    const store = registrationStore();
                    store.updateLoading(false);
                    store.updateRegistrations([]);
                    const pushHistoryFn = jest.fn();
                    (useHistory as jest.Mock).mockReturnValue({
                        push: pushHistoryFn,
                    });
                    const { render } = make_sut(<SearchBar />);
                    render("/");
                    const button = screen.getByTestId("test--button");
                    fireEvent.click(button);
                    expect(pushHistoryFn).toHaveBeenCalledWith("/new-user");
                });
            });
        });
    });
});
