import { BehaviorSubject, Observable } from "rxjs";
import singleton from "~/lib/injection/singleton";

interface Options {
    variant: "success" | "error" | "warning" | "info";
    body: string;
    closable?: boolean;
    timeout?: number;
}
interface State {
    readonly alerts: Observable<Options[]>;
}

interface Mutations {
    update(value: Options[]): void;
    reset(): void;
}

type Store = State & Mutations;

const $alerts = new BehaviorSubject<Options[]>([]);

class StoreImp implements Store {
    constructor() {}
    public readonly alerts: Observable<Options[]> = $alerts.asObservable();
    public update(value: Options[]): void {
        $alerts.next(value);
    }
    public reset() {
        $alerts.next([]);
    }
}

const alertsStore = singleton(() => new StoreImp(), []);
export default alertsStore;
export type { Store as AlertsStore, Options as AlertsOptions };
