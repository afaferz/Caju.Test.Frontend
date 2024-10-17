import { BehaviorSubject, Observable } from "rxjs";
import { RegistrationModel } from "~/data/models/registration/registrationModel";
import singleton from "~/lib/injection/singleton";

interface State {
    readonly registrations: Observable<RegistrationModel[] | null>;
    readonly registrationModel: Observable<Omit<RegistrationModel, "id"> | {}>;
    readonly loading: Observable<boolean>;
}

interface Mutations {
    updateRegistrations(value: RegistrationModel[] | null): void;
    updateRegistrationModel(value: Omit<RegistrationModel, "id"> | {}): void;
    updateLoading(loading: boolean): void;
}

type Store = State & Mutations;

const $registrations = new BehaviorSubject<RegistrationModel[] | null>(null);
const $registrationModel = new BehaviorSubject<RegistrationModel | {}>({});
const $loading = new BehaviorSubject<boolean>(false);
class StoreImp implements Store {
    constructor() {}
    public readonly registrations: Observable<RegistrationModel[] | null> =
        $registrations.asObservable();
    public readonly registrationModel: Observable<
        {} | Omit<RegistrationModel, "id">
    > = $registrationModel.asObservable();
    public readonly loading: Observable<boolean> = $loading.asObservable();
    public updateRegistrations(value: RegistrationModel[] | null): void {
        $registrations.next(value);
    }
    public updateRegistrationModel(
        value: Omit<RegistrationModel, "id"> | {}
    ): void {
        $registrationModel.next(value);
    }
    public updateLoading(loading: boolean): void {
        $loading.next(loading);
    }
}

const alertStore = singleton(() => new StoreImp(), []);
export default alertStore;
export type { Store as AlertStore };
