import * as React from "react";
import Router from "~/router";
import { Header } from "./components/Header";
import Toast from "./components/Alerts/Toast";

function App() {
    return (
        <>
            <Header>
                <h1>Caju Front Teste</h1>
            </Header>
            <Router />
            <Toast />
        </>
    );
}

export default App;
