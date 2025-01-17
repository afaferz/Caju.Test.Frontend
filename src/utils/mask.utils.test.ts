import MaskUtils from "./mask.utils";

describe("utils", () => {
    describe("mask.utils", () => {
        it("should format cpf", async () => {
            const input = "99999999999";
            const target = "999.999.999-99";
            const mask = "999.999.999-99";
            const masked = MaskUtils.format(input, mask);

            expect(masked).toEqual(target);
        });
        it("should format phone", async () => {
            const input = "5561999999999";
            const target = "+55 (61) 9 9999-9999";
            const mask = "+99 (99) 9 9999-9999";
            const masked = MaskUtils.format(input, mask);

            expect(masked).toEqual(target);
        });
        it("should format empty inputs", async () => {
            const input = "";
            const target = "";
            const mask = "999.999.999-99";
            const masked = MaskUtils.format(input, mask);
            expect(masked).toEqual(target);
        });
        it("should format special chars", async () => {
            const input = "asd#123123";
            const target = "asd.#1-23";
            const mask = "***.**-**";
            const masked = MaskUtils.format(input, mask);
            expect(masked).toEqual(target);
        });
        it("should not format without mask", async () => {
            const input = "   ";
            const target = "";
            const mask = "";
            const masked = MaskUtils.format(input, mask);
            expect(masked).toEqual(target);
        });
    });
});
