import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Collumns from ".";
import store from "~/store/registrations/registrations.store";
import useObservable from "~/hooks/observable.hook";

jest.mock("~/store/registrations/registrations.store");
jest.mock("~/hooks/observable.hook");
jest.mock("../RegistrationCard", () => ({
    __esModule: true,
    default: ({ data, $action }: any) => (
        <div>
            {`Registration Card ${data.id}`}
            <button onClick={() => $action(jest.fn, [data])}>Action</button>
        </div>
    ),
}));
jest.mock("~/components/Spinner", () => ({
    __esModule: true,
    default: () => <div>Loading...</div>,
}));
// jest.mock("~/components/Modal", () => {
//     return {
//         __esModule: true,
//         default: (_data: any) => (
//             <div>
//                 <div>Tem certeza que deseja continuar?</div>
//                 <button onClick={confirmFn}>Confirmar</button>
//                 <button onClick={cancelFn}>Cancelar</button>
//             </div>
//         ),
//     };
// });

describe("pages", () => {
    describe("Dashboard", () => {
        describe("components", () => {
            describe("Columns", () => {
                const mockRegistrations = [
                    {
                        admissionDate: "22/10/2023",
                        email: "filipe@caju.com.br",
                        employeeName: "Filipe Marins",
                        status: "APPROVED",
                        cpf: "78502270001",
                        id: 1,
                    },
                    {
                        admissionDate: "22/10/2023",
                        email: "filipe@caju.com.br",
                        employeeName: "Filipe Marins",
                        status: "REVIEW",
                        cpf: "78502270001",
                        id: 2,
                    },
                    {
                        admissionDate: "22/10/2023",
                        email: "filipe@caju.com.br",
                        employeeName: "Filipe Marins",
                        status: "REPROVED",
                        cpf: "78502270001",
                        id: 3,
                    },
                ];

                beforeEach(() => {
                    jest.clearAllMocks();
                });
                beforeAll(() => {
                    window.HTMLDialogElement.prototype.showModal = jest.fn();
                    window.HTMLDialogElement.prototype.close = jest.fn();
                });

                it("should render without mocks", async () => {
                    jest.restoreAllMocks();
                    (store as unknown as jest.Mock).mockReturnValue({
                        loading: false,
                    });
                    (useObservable as jest.Mock).mockReturnValue(false);
                    const { getAllByText, getByTestId } = render(
                        <Collumns registrations={mockRegistrations} />
                    );

                    const btnAction = getAllByText(/Action/i);
                    await waitFor(() => fireEvent.click(btnAction[0]));
                    const btnConfirm = getByTestId("test--modal-confirm-btn");
                    const btnCancel = getByTestId("test--modal-cancel-btn");

                    fireEvent.click(btnConfirm);
                    fireEvent.click(btnCancel);
                });
                it("should render loading spinner when loading is true", () => {
                    (useObservable as jest.Mock).mockReturnValue(true);
                    (store as unknown as jest.Mock).mockReturnValue({
                        loading: true,
                    });

                    render(<Collumns registrations={mockRegistrations} />);
                    screen
                        .getAllByText("Loading...")
                        .forEach((item) => expect(item).toBeInTheDocument());
                });

                it("should display a message when no registrations are found", () => {
                    (useObservable as jest.Mock).mockReturnValue(false);
                    (store as unknown as jest.Mock).mockReturnValue({
                        loading: false,
                    });

                    render(<Collumns registrations={[]} />);

                    screen
                        .getAllByText("Nenhum registro encontrado")
                        .forEach((item) => expect(item).toBeInTheDocument());
                });

                it("should render registration cards when registrations are available", () => {
                    (useObservable as jest.Mock).mockReturnValue(false);
                    (store as unknown as jest.Mock).mockReturnValue({
                        loading: false,
                    });

                    render(<Collumns registrations={mockRegistrations} />);

                    expect(
                        screen.getByText("Registration Card 1")
                    ).toBeInTheDocument();
                    expect(
                        screen.getByText("Registration Card 2")
                    ).toBeInTheDocument();
                    expect(
                        screen.getByText("Registration Card 3")
                    ).toBeInTheDocument();
                });
            });
        });
    });
});
