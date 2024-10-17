import React from "react";

export default function usePromise<T = unknown>(
    promise: Promise<T>,
    defaultValue?: T
): Promise<T> {
    const [state, setState] = React.useState<T | undefined>(defaultValue);

    React.useEffect(() => {
        let canceled = false;
        promise.then((value) => {
            if (!canceled) setState(value);
        });

        return () => {
            canceled = true;
        };
    }, [promise]);

    return state as Promise<T>;
}
