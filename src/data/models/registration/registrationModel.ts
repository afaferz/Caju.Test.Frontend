const RegistrationStatus = {
    REVIEW: "REVIEW",
    REPROVED: "REPROVED",
    APPROVED: "APPROVED",
} as const;

type RegistrationModel = {
    id: number;
    admissionDate: string;
    email: string;
    employeeName: string;
    status: (typeof RegistrationStatus)[keyof typeof RegistrationStatus];
    cpf: string;
};

export type { RegistrationModel };
export { RegistrationStatus };
