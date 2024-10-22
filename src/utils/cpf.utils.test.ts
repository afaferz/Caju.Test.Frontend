import CpfUtils from "./cpf.utils";

describe("utils", () => {
    describe("cpf.utils", () => {
        it("should return a valid cpf", async () => {
            const input = '343.710.430-62'
            const target = CpfUtils.isValid(input);
            expect(target).toBeTruthy();
        });
        it("should return a invalid cpf", async () => {
            const input = '999.999.999-99'
            const target = CpfUtils.isValid(input);
            expect(target).toBeFalsy();
        });
        it("should return a valid cpf wth/ mask", async () => {
            const input = '95047510085'
            const target = CpfUtils.isValid(input);
            expect(target).toBeTruthy();
        });
        it('should return invalid cpf in NOT_ALLOWED list', async () => {
            const input = '999999999999'
            const target = CpfUtils.isValid(input);
            expect(target).toBeFalsy();
        })
        it('should return false if the first digit does not match', async () => {
            const input = '12345678911'
            const target = CpfUtils.isValid(input);
            expect(target).toBeFalsy();
        })
        it('should return false if the second digit does not match', async () => {
            const input = '12345678901'
            const target = CpfUtils.isValid(input);
            expect(target).toBeFalsy();
        })
    });
});
