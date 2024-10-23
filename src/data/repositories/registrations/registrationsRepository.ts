import { RegistrationModel } from "~/data/models/registration/registrationModel";

interface RegistrationsRepository {
    getAll(): Promise<RegistrationModel[]>;
    filterBy(params: Record<string, string>): Promise<RegistrationModel[]>;
    getById(id: number | string): Promise<RegistrationModel>;
    create(model: Omit<RegistrationModel, "id">): Promise<void>;
    updateById(id: number | string, model: Omit<RegistrationModel, "id">): Promise<RegistrationModel>;
    deleteById(id: number | string): Promise<void>;
}

export type { RegistrationsRepository };
