import singleton from "~/lib/injection/singleton";
import alertsStore, {
    AlertsOptions,
    AlertsStore,
} from "~/store/alerts/alerts.store";
import PromiseUtils from "~/utils/promise.utils";

interface Provider {
    push(value: AlertsOptions): Provider;
    remove(value: AlertsOptions): Provider;
    clear(): Provider;
}

class ProviderImp implements Provider {
    constructor(private readonly store: AlertsStore) {}
    public push(value: AlertsOptions): Provider {
        value.closable = value.closable ?? true;
        this._insert(value);
        return this;
    }

    public remove(value: AlertsOptions): Provider {
        this._remove(value);
        return this;
    }
    public clear(): Provider {
        this.store.update([]);
        return this;
    }

    private async _insert(value: AlertsOptions): Promise<void> {
        const prev = await PromiseUtils.from(this.store.alerts);
        const alerts = [value, ...prev];
        this.store.update(alerts);
        if (value.timeout) {
            await PromiseUtils.sleep(value.timeout);
            await this._remove(value);
        }
    }

    private async _remove(value: AlertsOptions): Promise<void> {
        const alerts = await PromiseUtils.from(this.store.alerts);
        const filtered = alerts.filter((option) => option != value);
        this.store.update(filtered);
    }
}

const alertsProvider = singleton(
    (store) => new ProviderImp(store),
    [alertsStore]
);

export default alertsProvider;
export type { Provider as AlertsProvider };
