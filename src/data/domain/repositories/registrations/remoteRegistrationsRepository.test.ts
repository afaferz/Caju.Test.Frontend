import { RegistrationsRepository } from "~/data/repositories/registrations/registrationsRepository";
import { RemoteRegistrationsRepositoryImp } from "./remoteRegistrationsRepository";
import { RegistrationDatasourceImp } from "~/data/datasources/registrations/registrationsDatasource";
import { MockAxiosClient } from "~/__mocks__/axiosClient.mock";

const datasource = new RegistrationDatasourceImp(new MockAxiosClient());
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
describe("domain", () => {
    describe("repositories", () => {
        describe("registrations", () => {
            describe("remoteRegistrationsRepository", () => {
                let remoteRegistrationsRepository: RegistrationsRepository;

                beforeEach(() => {
                    remoteRegistrationsRepository =
                        new RemoteRegistrationsRepositoryImp(datasource);
                });
                it("should return a list of registrations", async () => {
                    jest.spyOn(datasource, "findAll").mockResolvedValueOnce(
                        mockResponse
                    );
                    const result = await remoteRegistrationsRepository.getAll();
                    expect(result.length).toEqual(2);
                    expect(result[0].cpf).toEqual("78502270001");
                });
                it("should return a registration", async () => {
                    jest.spyOn(datasource, "findOne").mockResolvedValueOnce(
                        mockResponse[0]
                    );
                    const result = await remoteRegistrationsRepository.getById(
                        1
                    );
                    expect(result.cpf).toEqual("78502270001");
                });
                it("should return a list of registrations w/ filter", async () => {
                    jest.spyOn(datasource, "findAll").mockResolvedValueOnce([
                        mockResponse[0],
                    ]);
                    const params = {
                        cpf: "78502270001",
                    };
                    const result = await remoteRegistrationsRepository.filterBy(
                        params
                    );
                    expect(result.length).toEqual(1);
                    expect(result[0].cpf).toEqual("78502270001");
                });
                it("should create a new registration", async () => {
                    const data = {
                        admissionDate: "22/10/2023",
                        email: "test@caju.com.br",
                        employeeName: "Teste",
                        status: "REVIEW",
                        cpf: "78502270001",
                    };
                    const spyFn = jest
                        .spyOn(datasource, "createOne")
                        .mockResolvedValueOnce();
                    await remoteRegistrationsRepository.create(data);
                    expect(spyFn).toHaveBeenCalledTimes(1);
                    expect(spyFn).toHaveBeenLastCalledWith({
                        admissionDate: "22/10/2023",
                        cpf: "78502270001",
                        email: "test@caju.com.br",
                        employeeName: "Teste",
                        status: "REVIEW",
                    });
                });
                it("should update a registration", async () => {
                    const id = 1;
                    const data = {
                        admissionDate: "23/10/2023",
                        email: "test@caju.com.br",
                        employeeName: "Teste",
                        status: "APPROVED",
                        cpf: "78502270001",
                    };
                    jest.spyOn(datasource, "updateOne").mockResolvedValueOnce({
                        id: 1,
                        admissionDate: "23/10/2023",
                        email: "test@caju.com.br",
                        employeeName: "Teste",
                        status: "APPROVED",
                        cpf: "78502270001",
                    });

                    const result =
                        await remoteRegistrationsRepository.updateById(
                            id,
                            data
                        );
                    expect(result).toStrictEqual({
                        id: 1,
                        admissionDate: "23/10/2023",
                        email: "test@caju.com.br",
                        employeeName: "Teste",
                        status: "APPROVED",
                        cpf: "78502270001",
                    });
                });
                it("should deleta a registration", async () => {
                    const id = 1;
                    const spyFn = jest
                        .spyOn(datasource, "deleteOne")
                        .mockResolvedValueOnce();
                    await remoteRegistrationsRepository.deleteById(id);
                    expect(spyFn).toHaveBeenCalledTimes(1);
                    expect(spyFn).toHaveBeenLastCalledWith(1);
                });
            });
        });
    });
});
