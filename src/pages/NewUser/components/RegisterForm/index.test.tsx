import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RegisterForm from ".";
import store from "~/store/registrations/registrations.store";

jest.mock("~/providers/registrations/registrations.provider");
jest.mock("~/hooks/observable.hook");
jest.mock("react-router-dom", () => ({
    useHistory: jest.fn(),
}));

describe("pages", () => {
    describe("NewUser", () => {
        describe("components", () => {
            describe("RegisterForm", () => {
                beforeEach(() => {
                    jest.clearAllMocks();
                });

                it("should validates employeeName input correctly", async () => {
                    const store$ = store();
                    store$.updateLoading(false);
                    render(<RegisterForm />);

                    const input = screen.getByPlaceholderText("Nome");

                    fireEvent.change(input, { target: { value: "A" } });
                    expect(
                        screen.getByText(
                            "Nome inválido. Deve conter pelo menos duas letras e um espaço."
                        )
                    ).toBeInTheDocument();

                    expect(
                        screen.queryByText("Nome é obrigatório.")
                    ).not.toBeInTheDocument();

                    fireEvent.change(input, { target: { value: "1Test" } });
                    expect(
                        screen.getByText(
                            "Nome inválido. Deve conter pelo menos duas letras e um espaço."
                        )
                    ).toBeInTheDocument();

                    fireEvent.change(input, { target: { value: "Test" } });
                    expect(
                        screen.getByText(
                            "Nome inválido. Deve conter pelo menos duas letras e um espaço."
                        )
                    ).toBeInTheDocument();
                });
            });
        });
    });
});
