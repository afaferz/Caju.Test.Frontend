import { BehaviorSubject, Observable } from "rxjs";
import { RegistrationModel } from "~/data/models/registration/registrationModel";
import singleton from "~/lib/injection/singleton";

interface State {
    readonly registrations: Observable<RegistrationModel[]>;
    readonly registration: Observable<
        RegistrationModel | Omit<RegistrationModel, "id"> | any
    >;
    readonly loading: Observable<boolean>;
}

interface Mutations {
    updateRegistrations(value: RegistrationModel[]): void;
    updateRegistration(
        value: RegistrationModel | Omit<RegistrationModel, "id"> | any
    ): void;
    updateLoading(loading: boolean): void;
}

type Store = State & Mutations;

const $registrations = new BehaviorSubject<RegistrationModel[]>([]);
const $registration = new BehaviorSubject<
    RegistrationModel | Omit<RegistrationModel, "id"> | any
>({});
const $loading = new BehaviorSubject<boolean>(false);
class StoreImp implements Store {
    constructor() {}
    public readonly registrations: Observable<RegistrationModel[]> =
        $registrations.asObservable();
    public readonly registration: Observable<
        RegistrationModel | Omit<RegistrationModel, "id"> | any
    > = $registration.asObservable();
    public readonly loading: Observable<boolean> = $loading.asObservable();
    public updateRegistrations(value: RegistrationModel[]): void {
        $registrations.next(value);
    }
    public updateRegistration(
        value: RegistrationModel | Omit<RegistrationModel, "id"> | any
    ): void {
        $registration.next(value);
    }
    public updateLoading(value: boolean): void {
        $loading.next(value);
    }
}

const registrationStore = singleton(() => new StoreImp(), []);
export default registrationStore;
export type { Store as RegistrationStore };
