import { BehaviorSubject, Observable } from "rxjs";
import { RegistrationModel } from "~/data/models/registration/registrationModel";
import singleton from "~/lib/injection/singleton";

interface State {
    readonly registrations: Observable<RegistrationModel[] | null>;
    readonly registration: Observable<RegistrationModel | null>;
    readonly loading: Observable<boolean>;
}

interface Mutations {
    updateRegistrations(value: RegistrationModel[] | null): void;
    updateRegistration(value: RegistrationModel | null): void;
    updateLoading(loading: boolean): void;
}

type Store = State & Mutations;

const $registrations = new BehaviorSubject<RegistrationModel[] | null>(null);
const $registration = new BehaviorSubject<RegistrationModel | null>(null);
const $loading = new BehaviorSubject<boolean>(false);
class StoreImp implements Store {
    constructor() {}
    public readonly registrations: Observable<RegistrationModel[] | null> =
        $registrations.asObservable();
    public readonly registration: Observable<RegistrationModel | null> =
        $registration.asObservable();
    public readonly loading: Observable<boolean> = $loading.asObservable();
    public updateRegistrations(value: RegistrationModel[] | null): void {
        $registrations.next(value);
    }
    public updateRegistration(value: RegistrationModel | null): void {
        $registration.next(value);
    }
    public updateLoading(loading: boolean): void {
        $loading.next(loading);
    }
}

const registrationStore = singleton(() => new StoreImp(), []);
export default registrationStore;
export type { Store as RegistrationStore };
