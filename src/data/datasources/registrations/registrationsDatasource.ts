import { HttpClient } from "~/data/models/httpClientModel";
import { RegistrationModel } from "~/data/models/registration/registrationModel";
import endpoints from "./registrationsEndpoints";
import singleton from "~/lib/injection/singleton";
import axiosClient from "~/data/api/axiosClient";

interface RegistrationDatasource {
    findAll(parameters?: Record<string, any>): Promise<RegistrationModel[]>;
    findOne(id: number): Promise<RegistrationModel>;
    createOne(model: Omit<RegistrationModel, "id">): Promise<void>;
    updateOne(model: RegistrationModel): Promise<RegistrationModel>;
    deleteOne(id: number): Promise<void>;
}

class RegistrationDatasourceImp implements RegistrationDatasource {
    constructor(private readonly httpClient: HttpClient) {}

    public async findAll(
        parameters?: Record<string, any>
    ): Promise<RegistrationModel[]> {
        try {
            const path = endpoints.find_all;
            const response = await this.httpClient.get<RegistrationModel[]>(
                path,
                parameters
            );

            return response;
        } catch (_) {
            throw new FindAllError(_);
        }
    }
    public async findOne(id: number): Promise<RegistrationModel> {
        try {
            const path = endpoints.find_one.replace(":id", String(id));
            const response = await this.httpClient.get<RegistrationModel>(path);
            return response;
        } catch (_) {
            console.log(_);
            throw new FindOneError(_);
        }
    }
    public async createOne(
        model: Omit<RegistrationModel, "id">
    ): Promise<void> {
        try {
            const path = endpoints.create_one;
            await this.httpClient.post<void>(path, model);
        } catch (_) {
            throw new CreateOneError(_);
        }
    }
    public async updateOne(
        model: RegistrationModel
    ): Promise<RegistrationModel> {
        try {
            const { id, ...register } = model;
            const path = endpoints.update_one.replace(":id", String(id));
            const response = await this.httpClient.put<RegistrationModel>(
                path,
                register
            );
            return response;
        } catch (_) {
            throw new UpdateOneError(_);
        }
    }
    public async deleteOne(id: number): Promise<void> {
        try {
            const path = endpoints.delete_one.replace(":id", String(id));
            await this.httpClient.delete<void>(path);
        } catch (_) {
            throw new DeleteOneError(_);
        }
    }
}

export class FindAllError extends Error {
    constructor(_err: any) {
        super("Error on FIND ALL registrations");
        console.log("[REGISTRATION] Error on FIND ALL registrations", _err);
    }
}
export class FindOneError extends Error {
    constructor(_err: any) {
        super("Error on FIND user registrations");
        console.log("[REGISTRATION] Error on FIND user registrations", _err);
    }
}
export class CreateOneError extends Error {
    constructor(_err: any) {
        super("Error on CREATE user registrations");
        console.log("[REGISTRATION] Error on CREATE user registrations", _err);
    }
}
export class UpdateOneError extends Error {
    constructor(_err: any) {
        super("Error on UPDATE user registrations");
        console.log("[REGISTRATION] Error on UPDATE user registrations", _err);
    }
}
export class DeleteOneError extends Error {
    constructor(_err: any) {
        super("Error on DELETE delete registrations");
        console.log(
            "[REGISTRATION] Error on DELETE delete registrations",
            _err
        );
    }
}
const registrationDatasource = singleton(
    (httpClient) => new RegistrationDatasourceImp(httpClient),
    [axiosClient]
);
export default registrationDatasource;
export { RegistrationDatasourceImp, type RegistrationDatasource };
