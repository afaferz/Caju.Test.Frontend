import { MockAxiosClient } from "~/__mocks__/axiosClient.mock";
import {
    CreateOneError,
    DeleteOneError,
    FindAllError,
    FindOneError,
    RegistrationDatasource,
    RegistrationDatasourceImp,
    UpdateOneError,
} from "./registrationsDatasource";
import { RegistrationStatus } from "~/data/domain/entities/registrations/registrationsStatus";

const axiosClientMock = new MockAxiosClient();

describe("data", () => {
    describe("datasources", () => {
        describe("registrations", () => {
            describe("registrationsDatasource", () => {
                let registrationDatasource: RegistrationDatasource;

                beforeEach(() => {
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
                    it("should return a list of registration w/ filtered parameters", async () => {
                        const mockResponse = [
                            {
                                id: 2,
                                admissionDate: "22/10/2023",
                                email: "jose@caju.com.br",
                                employeeName: "José Leão",
                                status: "REPROVED",
                                cpf: "78502270001",
                            },
                        ];
                        const parameters = {
                            cpf: "78502270001",
                        };
                        axiosClientMock.setMockResponse(
                            "/registrations?cpf=78502270001",
                            "GET",
                            200,
                            mockResponse
                        );
                        const result = await registrationDatasource.findAll(
                            parameters
                        );
                        expect(result.length).toEqual(1);
                        expect(result).toStrictEqual(mockResponse);
                    });
                    it("should throw error when GET a list of registration", async () => {
                        axiosClientMock.setMockResponse(
                            "/registrations",
                            "GET",
                            404,
                            { message: "Error on FIND ALL registrations" }
                        );
                        await expect(
                            registrationDatasource.findAll()
                        ).rejects.toThrow(FindAllError);
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
                        axiosClientMock.setMockResponse(
                            "/registrations/1",
                            "GET",
                            404,
                            { message: "Error on FIND user registrations" }
                        );
                        await expect(
                            registrationDatasource.findOne(1)
                        ).rejects.toThrow(FindOneError);
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
                        axiosClientMock.setMockResponse(
                            "/registrations",
                            "POST",
                            404,
                            { message: "Error on CREATE user registrations" }
                        );
                        await expect(
                            registrationDatasource.createOne({
                                admissionDate: "23/10/2023",
                                email: "filipe@caju.com.br",
                                employeeName: "Filipe Marins",
                                status: RegistrationStatus.APPROVED,
                                cpf: "78502270001",
                            })
                        ).rejects.toThrow(CreateOneError);
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
                        axiosClientMock.setMockResponse(
                            "/registrations/1",
                            "PUT",
                            404,
                            { message: "Error on UPDATE user registrations" }
                        );
                        await expect(
                            registrationDatasource.updateOne({
                                id: 1,
                                admissionDate: "23/10/2023",
                                email: "filipe@caju.com.br",
                                employeeName: "Filipe Marins",
                                status: RegistrationStatus.APPROVED,
                                cpf: "78502270001",
                            })
                        ).rejects.toThrow(UpdateOneError);
                    });
                });
                describe("registrationsDatasource.deleteOne", () => {
                    it("should DELETE a register of registration", async () => {
                        axiosClientMock.setMockResponse(
                            "/registrations/1",
                            "DELETE",
                            204,
                            {}
                        );
                        const result = await registrationDatasource.deleteOne(
                            1
                        );
                        expect(result).toBeUndefined();
                    });
                    it("should throw error when DELETE a register on registration", async () => {
                        axiosClientMock.setMockResponse(
                            "/registrations/1",
                            "DELETE",
                            404,
                            { message: "Error on DELETE user registrations" }
                        );
                        await expect(
                            registrationDatasource.deleteOne(1)
                        ).rejects.toThrow(DeleteOneError);
                    });
                });
            });
        });
    });
});
