import singleton from "./singleton";
const Test = class {
    constructor(public readonly a: string, public readonly b: number) {}
};

describe("lib", () => {
    describe("injection", () => {
        describe("singleton", () => {
            it("must retrive the same instance after any calls.", () => {
                const service = singleton(() => new Test("", 0), []);
                const a = service();
                const b = service();
                expect(a).toStrictEqual(b);
            });
            it("must inject dependencies", () => {
                const service = singleton(
                    (a: string, b: number) => new Test(a, b),
                    [() => "test", () => 0]
                );
                const instance = service();
                expect(instance.a).toEqual("test");
                expect(instance.b).toEqual(0);
            });
            it("must reset.", () => {
                const service = singleton(() => new Test("", 0));
                const a = service();
                service.reset();
                const b = service();
                expect(a).not.toBe(b);
            });
            it("must change dependencies", () => {
                const service = singleton(
                    (a: string, b: number) => new Test(a, b),
                    [() => "test", () => 0]
                );
                service();
                service.setDeps([() => "test2", () => 1]);
                const instance = service();
                expect(instance.a).toEqual("test2");
                expect(instance.b).toEqual(1);
            });
            it("must retrieve dependencies", () => {
                const depA = () => "test";
                const depB = () => 0;
                const service = singleton(
                    (a: string, b: number) => new Test(a, b),
                    [depA, depB]
                );
                const deps = service.getDeps();
                expect(deps).toStrictEqual([depA, depB]);
            });
        });
    });
});
