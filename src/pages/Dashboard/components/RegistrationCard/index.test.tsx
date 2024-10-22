import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegistrationCard from "../RegistrationCard";
import { RegistrationStatus } from "~/data/domain/entities/registrations/registrationsStatus";
import { RegistrationModel } from "~/data/models/registration/registrationModel";

jest.mock("~/components/Buttons", () => ({
    __esModule: true,
    default: ({ children, $click }: any) => (
        <button onClick={$click}>{children}</button>
    ),
}));

jest.mock("react-icons/hi", () => ({
    HiOutlineMail: () => <span>Mail Icon</span>,
    HiOutlineUser: () => <span>User Icon</span>,
    HiOutlineCalendar: () => <span>Calendar Icon</span>,
    HiOutlineTrash: ({ onClick }: any) => (
        <span onClick={onClick}>Delete Icon</span>
    ),
}));

describe("pages", () => {
    describe("Dashboard", () => {
        describe("components", () => {
            describe("RegistrationCard", () => {
                const mockRegistration = {
                    admissionDate: "22/10/2023",
                    email: "filipe@caju.com.br",
                    employeeName: "Filipe Marins",
                    status: "REVIEW",
                    cpf: "78502270001",
                    id: 1,
                };

                const mockAction = jest.fn();

                const renderComponent = (
                    status?: (typeof RegistrationStatus)[keyof typeof RegistrationStatus]
                ) => {
                    const payload = {
                        ...mockRegistration,
                        status,
                    } as RegistrationModel;
                    render(
                        <RegistrationCard data={payload} $action={mockAction} />
                    );
                };

                beforeEach(() => {
                    jest.clearAllMocks();
                });

                it("should render the component with correct information", () => {
                    renderComponent();

                    expect(
                        screen.getByText("Filipe Marins")
                    ).toBeInTheDocument();
                    expect(
                        screen.getByText("filipe@caju.com.br")
                    ).toBeInTheDocument();
                    expect(screen.getByText("22/10/2023")).toBeInTheDocument();
                });

                it("should call $action with correct arguments when approve button is clicked", () => {
                    renderComponent(RegistrationStatus.REVIEW);

                    const approveButton = screen.getByText("Aprovar");
                    fireEvent.click(approveButton);

                    expect(mockAction).toHaveBeenCalledWith(
                        expect.any(Function),
                        [mockRegistration, RegistrationStatus.APPROVED]
                    );
                });

                it("should call $action with correct arguments when reprove button is clicked", () => {
                    renderComponent(RegistrationStatus.REVIEW);

                    const rejectButton = screen.getByText("Reprovar");
                    fireEvent.click(rejectButton);

                    expect(mockAction).toHaveBeenCalledWith(
                        expect.any(Function),
                        [mockRegistration, RegistrationStatus.REPROVED]
                    );
                });

                it("should show review button when status is not REVIEW", async () => {
                    renderComponent(RegistrationStatus.APPROVED);

                    expect(
                        screen.getByText("Revisar novamente")
                    ).toBeInTheDocument();
                    await waitFor(() =>
                        fireEvent.click(screen.getByText("Revisar novamente"))
                    );
                    const payload = {
                        ...mockRegistration,
                        status: RegistrationStatus.APPROVED,
                    }
                    expect(mockAction).toHaveBeenCalledWith(
                        expect.any(Function),
                        [payload, RegistrationStatus.REVIEW]
                    );
                });

                it("should calls $action with correct arguments when trash icon is clicked", async () => {
                    renderComponent(RegistrationStatus.REVIEW);

                    await waitFor(() =>
                        fireEvent.click(screen.getByText("Delete Icon"))
                    );

                    expect(mockAction).toHaveBeenCalledWith(
                        expect.any(Function),
                        [mockRegistration]
                    );
                });
            });
        });
    });
});
