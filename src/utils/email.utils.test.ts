import EmailUtils from "./email.utils";

describe("utils", () => {
    describe("email.utils", () => {
        it("should return a valid email", async () => {
            const input = 'test@gmail.com'
            const target = EmailUtils.isValid(input);
            expect(target).toBeTruthy();
        });
        it("should return a invalid email", async () => {
            const input = 'test..test@gmail.com'
            const target = EmailUtils.isValid(input);
            expect(target).toBeFalsy();
        });
    });
});
