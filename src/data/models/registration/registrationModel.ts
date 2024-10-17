import { RegistrationStatus } from "~/data/domain/entities/registrations/registrationsStatus";

type RegistrationModel = {
    id: number;
    admissionDate: string;
    email: string;
    employeeName: string;
    status: (typeof RegistrationStatus)[keyof typeof RegistrationStatus] | string;
    cpf: string;
};

export type { RegistrationModel };
