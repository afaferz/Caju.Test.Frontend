import * as React from "react";
import { render as renderUi } from "@testing-library/react";
import { MemoryRouter } from "react-router";

const make_sut = (ui: React.ReactElement) => {
    return {
        render: (route: string = "/") => {
            return renderUi(
                <MemoryRouter initialEntries={[{ pathname: route }]}>
                    {ui}
                </MemoryRouter>
            );
        },
    };
};

export default make_sut;
