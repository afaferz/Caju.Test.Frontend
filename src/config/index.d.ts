declare type Environment =
    | "local"
    | "test"
    | "development"
    | "homologation"
    | "production";

declare type System = {
    debug: boolean;
    environment: Environment;
    verison: `${System["environment"]}-version`;
    version_number: string;
};

declare interface Module {
    host: string;
    system: System;
}
export default Module;
