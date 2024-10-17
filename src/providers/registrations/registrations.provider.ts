import { RegistrationModel } from "~/data/models/registration/registrationModel";
import { RegistrationsRepository } from "~/data/repositories/registrations/registrationsRepository";
import { AlertStore } from "~/store/alerts/alerts.store";
import { RegistrationStore } from "~/store/registration/registrations.store";

export interface Provider {
    getAllRegistrations(): Promise<void>;
    getRegistrationByFilter(params: Record<string, string>): Promise<void>;
    getRegistrationById(id: number): Promise<void>;
    updateRegistration(payload: RegistrationModel): Promise<void>;
    resetRegistration(): void;
    deleteRegistration(id: number): Promise<void>;
    createRegistration(payload: Omit<RegistrationModel, "id">): Promise<void>;
}

class ProviderImp implements Provider {
    constructor(
        private readonly store: RegistrationStore,
        private readonly alertStore: AlertStore,
        private readonly repository: RegistrationsRepository
    ) {}
    public async getAllRegistrations(): Promise<void> {
        this.store.updateLoading(true);
        try {
            const data = await this.repository.getAll();
            this.store.updateRegistrations(data);
        } catch (error) {
            // this.alertStore;
        } finally {
            this.store.updateLoading(false);
        }
    }
    public async getRegistrationByFilter(
        params: Record<string, string>
    ): Promise<void> {
        this.store.updateLoading(true);
        try {
            const data = await this.repository.filterBy(params);
            this.store.updateRegistrations(data);
        } catch (error) {
            // this.alertStore;
        } finally {
            this.store.updateLoading(false);
        }
    }
    public async getRegistrationById(id: number): Promise<void> {
        this.store.updateLoading(true);
        try {
            const data = await this.repository.getById(id);
            this.store.updateRegistration(data);
        } catch (error) {
        } finally {
            this.store.updateLoading(false);
        }
    }
    public async createRegistration(
        payload: Omit<RegistrationModel, "id">
    ): Promise<void> {
        this.store.updateLoading(true);
        try {
            await this.repository.create(payload);
            await this.getAllRegistrations();
        } catch (error) {
        } finally {
            this.store.updateLoading(false);
        }
    }
    public async updateRegistration(payload: RegistrationModel): Promise<void> {
        this.store.updateLoading(true);
        const { id, ...register } = payload;
        try {
            await this.repository.updateById(id, register);
            await this.getAllRegistrations();
        } catch (error) {
        } finally {
            this.store.updateLoading(false);
        }
    }

    public resetRegistration(): void {
        this.store.updateRegistration(null);
    }
    public async deleteRegistration(id: number): Promise<void> {
        this.store.updateLoading(true);
        try {
            await this.repository.deleteById(id);
            await this.getAllRegistrations();
        } catch (error) {
        } finally {
            this.store.updateLoading(false);
        }
    }
}
