import { RegistrationModel } from "~/data/models/registration/registrationModel";

interface RegistrationsRepository {
    getAll(): Promise<RegistrationModel[]>;
    filterBy(params: Record<string, string>): Promise<RegistrationModel[]>;
    getById(id: number): Promise<RegistrationModel>;
    create(model: Omit<RegistrationModel, "id">): Promise<void>;
    updateById(id: number, model: Omit<RegistrationModel, "id">): Promise<RegistrationModel>;
    deleteById(id: number): Promise<void>;
}

export type { RegistrationsRepository };
