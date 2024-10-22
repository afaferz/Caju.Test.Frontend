import * as React from "react";

type Props = {
    test: any;
    children: React.ReactNode;
};
export default React.memo((props: Props) => {
    const { children, test } = props;
    return Boolean(test) ? children : <></>;
});
