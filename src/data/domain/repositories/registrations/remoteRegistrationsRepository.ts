import registrationDatasource, {
    RegistrationDatasource,
} from "~/data/datasources/registrations/registrationsDatasource";
import { RegistrationModel } from "~/data/models/registration/registrationModel";
import { RegistrationsRepository } from "~/data/repositories/registrations/registrationsRepository";
import singleton from "~/lib/injection/singleton";

class RemoteRegistrationsRepositoryImp implements RegistrationsRepository {
    constructor(private readonly datasource: RegistrationDatasource) {}
    public async getAll(): Promise<RegistrationModel[]> {
        const result = await this.datasource.findAll();
        return result;
    }
    public async filterBy(
        params: Record<string, string>
    ): Promise<RegistrationModel[]> {
        const result = await this.datasource.findAll(params);
        return result;
    }
    public async getById(id: number): Promise<RegistrationModel> {
        const result = await this.datasource.findOne(id);
        return result;
    }
    public async create(model: Omit<RegistrationModel, "id">): Promise<void> {
        await this.datasource.createOne(model);
    }
    public async updateById(
        id: number,
        model: Omit<RegistrationModel, "id">
    ): Promise<RegistrationModel> {
        const model$ = {
            ...model,
            id,
        };
        const result = await this.datasource.updateOne(model$);
        return result;
    }
    public async deleteById(id: number): Promise<void> {
        await this.datasource.deleteOne(id);
    }
}
const remoteRegistrationsRepository = singleton(
    (datasource) => new RemoteRegistrationsRepositoryImp(datasource),
    [registrationDatasource]
);
export default remoteRegistrationsRepository;
export { RemoteRegistrationsRepositoryImp };
