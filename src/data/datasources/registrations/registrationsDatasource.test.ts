import { MockAxiosClient } from "~/__mocks__/axiosClient.mock";
import {
    CreateOneError,
    FindAllError,
    FindOneError,
    RegistrationDatasource,
    RegistrationDatasourceImp,
    UpdateOneError,
} from "./registrationsDatasource";
import {
    RegistrationModel,
    RegistrationStatus,
} from "~/data/models/registration/registrationModel";

const axiosClientMock = new MockAxiosClient();

describe("data", () => {
    describe("datasources", () => {
        describe("registrations", () => {
            describe("registrationsDatasource", () => {
                let registrationDatasource: RegistrationDatasource;

                beforeAll(() => {
                    // Mock da instancia do HttpClient - No caso o AxiosClient
                    registrationDatasource = new RegistrationDatasourceImp(
                        axiosClientMock
                    );
                });
                describe("registrationsDatasource.findAll", () => {
                    it("should return a list of registration", async () => {
                        const mockResponse = [
                            {
                                id: 1,
                                admissionDate: "22/10/2023",
                                email: "filipe@caju.com.br",
                                employeeName: "Filipe Marins",
                                status: "REVIEW",
                                cpf: "78502270001",
                            },
                            {
                                id: 2,
                                admissionDate: "22/10/2023",
                                email: "jose@caju.com.br",
                                employeeName: "José Leão",
                                status: "REPROVED",
                                cpf: "78502270001",
                            },
                        ];
                        axiosClientMock.setMockResponse(
                            "/registrations",
                            "GET",
                            200,
                            mockResponse
                        );
                        const result = await registrationDatasource.findAll();
                        expect(result.length).toEqual(2);
                        expect(result).toStrictEqual(mockResponse);
                    });
                    it("should throw error when GET a list of registration", async () => {
                        try {
                            axiosClientMock.setMockResponse(
                                "/registrations",
                                "GET",
                                404,
                                { message: "Error on FIND ALL registrations" }
                            );
                            await registrationDatasource.findAll();
                        } catch (error) {
                            const handle = () => {
                                throw new FindAllError("");
                            };
                            expect(handle).toThrow(FindAllError);
                            expect(handle).toThrow(
                                "Error on FIND ALL registrations"
                            );
                        }
                    });
                });
                describe("registrationsDatasource.findOne", () => {
                    it("should return a register of registration", async () => {
                        const mockResponse = {
                            id: 1,
                            admissionDate: "22/10/2023",
                            email: "filipe@caju.com.br",
                            employeeName: "Filipe Marins",
                            status: "REVIEW",
                            cpf: "78502270001",
                        };
                        axiosClientMock.setMockResponse(
                            "/registrations/1",
                            "GET",
                            200,
                            mockResponse
                        );
                        const result = await registrationDatasource.findOne(1);
                        expect(result).toStrictEqual(mockResponse);
                    });
                    it("should throw error when GET a register of registration", async () => {
                        try {
                            axiosClientMock.setMockResponse(
                                "/registrations/1",
                                "GET",
                                404,
                                { message: "Error on FIND user registrations" }
                            );
                            await registrationDatasource.findAll();
                        } catch (error) {
                            const handle = () => {
                                throw new FindOneError("");
                            };
                            expect(handle).toThrow(FindOneError);
                            expect(handle).toThrow(
                                "Error on FIND user registrations"
                            );
                        }
                    });
                });
                describe("registrationsDatasource.createOne", () => {
                    it("should create a register of registration", async () => {
                        const mockResponse = {
                            id: 1,
                            admissionDate: "23/10/2023",
                            email: "filipe@caju.com.br",
                            employeeName: "Filipe Marins",
                            status: "REVIEW",
                            cpf: "78502270001",
                        };
                        const data = {
                            admissionDate: "23/10/2023",
                            email: "filipe@caju.com.br",
                            employeeName: "Filipe Marins",
                            status: RegistrationStatus.APPROVED,
                            cpf: "78502270001",
                        };
                        axiosClientMock.setMockResponse(
                            "/registrations",
                            "POST",
                            200,
                            mockResponse
                        );
                        const result = await registrationDatasource.createOne(
                            data
                        );
                        expect(result).toBeUndefined();
                    });
                    it("should throw error when POST a register on registration", async () => {
                        try {
                            axiosClientMock.setMockResponse(
                                "/registrations",
                                "PUT",
                                404,
                                {
                                    message:
                                        "Error on CREATE user registrations",
                                }
                            );
                            await registrationDatasource.createOne({
                                admissionDate: "23/10/2023",
                                email: "filipe@caju.com.br",
                                employeeName: "Filipe Marins",
                                status: RegistrationStatus.APPROVED,
                                cpf: "78502270001",
                            });
                        } catch (error) {
                            const handle = () => {
                                throw new CreateOneError("");
                            };
                            expect(handle).toThrow(CreateOneError);
                            expect(handle).toThrow(
                                "Error on CREATE user registrations"
                            );
                        }
                    });
                });
                describe("registrationsDatasource.updateOne", () => {
                    it("should update a register of registration", async () => {
                        const mockResponse = {
                            id: 1,
                            admissionDate: "23/10/2023",
                            email: "filipe@caju.com.br",
                            employeeName: "Filipe Marins",
                            status: "REVIEW",
                            cpf: "78502270001",
                        };
                        const data = {
                            id: 1,
                            admissionDate: "23/10/2023",
                            email: "filipe@caju.com.br",
                            employeeName: "Filipe Marins",
                            status: RegistrationStatus.APPROVED,
                            cpf: "78502270001",
                        };
                        axiosClientMock.setMockResponse(
                            "/registrations/1",
                            "PUT",
                            204,
                            mockResponse
                        );
                        const result = await registrationDatasource.updateOne(
                            data
                        );
                        expect(result).toStrictEqual(mockResponse);
                    });
                    it("should throw error when PUT a register on registration", async () => {
                        try {
                            axiosClientMock.setMockResponse(
                                "/registrations/1",
                                "PUT",
                                404,
                                {
                                    message:
                                        "Error on UPDATE user registrations",
                                }
                            );
                            await registrationDatasource.updateOne({
                                id: 1,
                                admissionDate: "23/10/2023",
                                email: "filipe@caju.com.br",
                                employeeName: "Filipe Marins",
                                status: RegistrationStatus.APPROVED,
                                cpf: "78502270001",
                            });
                        } catch (error) {
                            const handle = () => {
                                throw new UpdateOneError("");
                            };
                            expect(handle).toThrow(UpdateOneError);
                            expect(handle).toThrow(
                                "Error on UPDATE user registrations"
                            );
                        }
                    });
                });
                describe("registrationsDatasource.deleteOne", () => {
                    it("should DELETE a register of registration", async () => {
                        const mockResponse = {
                            id: 1,
                            admissionDate: "23/10/2023",
                            email: "filipe@caju.com.br",
                            employeeName: "Filipe Marins",
                            status: "REVIEW",
                            cpf: "78502270001",
                        };
                        axiosClientMock.setMockResponse(
                            "/registrations/1",
                            "DELETE",
                            204,
                            mockResponse
                        );
                        const result = await registrationDatasource.deleteOne(
                            1
                        );
                        expect(result).toBeUndefined();
                    });
                    it("should throw error when DELETE a register on registration", async () => {
                        try {
                            axiosClientMock.setMockResponse(
                                "/registrations/1",
                                "DELETE",
                                404,
                                { message: "Error on FIND user registrations" }
                            );
                            await registrationDatasource.deleteOne(1);
                        } catch (error) {
                            const handle = () => {
                                throw new FindOneError("");
                            };
                            expect(handle).toThrow(FindOneError);
                            expect(handle).toThrow(
                                "Error on FIND user registrations"
                            );
                        }
                    });
                });
            });
        });
    });
});
