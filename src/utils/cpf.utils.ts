const NOT_ALLOWED_CPF = [
    "00000000000000",
    "11111111111111",
    "22222222222222",
    "33333333333333",
    "44444444444444",
    "55555555555555",
    "66666666666666",
    "77777777777777",
    "88888888888888",
    "99999999999999",
];

function isValid(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]/g, "");

    if (NOT_ALLOWED_CPF.includes(cpf)) return false;

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    function digit(cpf: string, factor: number): number {
        let total = 0;
        for (let i = 0; i < factor - 1; i++) {
            total += parseInt(cpf[i]) * (factor - i);
        }
        const remainder = total % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }

    const firstDigit = digit(cpf, 10);
    if (firstDigit !== parseInt(cpf[9])) return false;

    const secondDigit = digit(cpf, 11);
    if (secondDigit !== parseInt(cpf[10])) return false;

    return true;
}

const CpfUtils = {
    isValid,
} as const;

export default CpfUtils;
