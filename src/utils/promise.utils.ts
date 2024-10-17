import { Observable, take, lastValueFrom } from "rxjs";

function _sleep(ms = 0): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Transforma um observable numa promise para resolver apenas o valor (será útil na store)
function _from<T>(observable: Observable<T>): Promise<T> {
    return lastValueFrom(observable.pipe(take(1)));
}

const PromiseUtils = {
    sleep: _sleep,
    from: _from,
} as const;

export default PromiseUtils;
