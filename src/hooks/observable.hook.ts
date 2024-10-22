import * as React from "react";
import { Observable } from "rxjs";

export default function useObservable<T = unknown>(
    observable: Observable<T>,
    defaultValue: T
): T {
    const [state, setState] = React.useState<T | undefined>(defaultValue);

    React.useEffect(() => {
        if (!observable) return () => void 0;
        const subscription = observable.subscribe(setState);
        return () => subscription.unsubscribe();
    }, [observable]);

    return state as T;
}
