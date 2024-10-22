import * as React from "react";
import { HiX } from "react-icons/hi";
import styled from "styled-components";
import If from "~/components/Common/If";
import useObservable from "~/hooks/observable.hook";
import alertsProvider from "~/providers/alerts/alerts.provider";
import alertsStore, { AlertsOptions } from "~/store/alerts/alerts.store";

const VARIANT_COLOR = {
    success: "rgb(155, 229, 155)",
    info: "info",
    warning: "warning",
    error: "rgb(255, 145, 154)",
};
const _ToastStyled = styled.div`
    position: fixed;
    top: 0;
    z-index: 999999;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
`;

const _ToastWrapperStyled = styled.div<{ $variant?: AlertsOptions["variant"] }>`
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    border-radius: 8px;
    background-color: ${(props) => VARIANT_COLOR[props.$variant ?? "info"]};
    color: #fff;
    width: 80%;
    animation: from-top 0.5s forwards ease;

    @keyframes from-top {
        from {
            transform: translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

const _ToastCloseButtonStyled = styled(HiX)`
    cursor: pointer;
`;

const _ToastContentStyled = styled.span`
    font-weight: bold;
`;

const Toast = React.memo(() => {
    const store = alertsStore();
    const provider = alertsProvider();
    const alerts = useObservable(store.alerts, []);

    const $close = (alert: AlertsOptions) => provider.remove(alert);

    return (
        <If test={alerts.length > 0}>
            <_ToastStyled data-testid="test--toast">
                {alerts.map((alert, idx) => (
                    <_ToastWrapperStyled
                        key={`toast-${idx}`}
                        $variant={alert.variant}
                        data-testid={`test--toast-${idx}`}
                    >
                        <_ToastContentStyled>{alert.body}</_ToastContentStyled>
                        <If test={alert.closable}>
                            <_ToastCloseButtonStyled
                                data-testid="test--toast-close-button"
                                onClick={() => $close(alert)}
                            />
                        </If>
                    </_ToastWrapperStyled>
                ))}
            </_ToastStyled>
        </If>
    );
});

export default Toast;
