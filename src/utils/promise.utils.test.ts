import { Subject } from "rxjs";
import PromiseUtils from "./promise.utils";

describe("utils", () => {
    describe("promise.utils", () => {
        it("should delay execution", async () => {
            const initialTime = performance.now();
            const toleranceTime = 0.5;
            const delay = 100;
            await PromiseUtils.sleep(delay);
            const elapsedTime = performance.now() - initialTime + toleranceTime;
            expect(elapsedTime).toBeGreaterThan(100);
        });
        it("shoud convert Observable to Promise", async () => {
            const subject = new Subject<number>();
            const task = PromiseUtils.from(subject);
            subject.next(1);
            const result = await task;
            expect(result).toStrictEqual(1);
        });
    });
});
