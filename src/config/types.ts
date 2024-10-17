type Environment =
    | "local"
    | "test"
    | "development"
    | "homologation"
    | "production";

type System = {
    debug: boolean;
    environment: Environment | string;
    version: `${System["environment"]}-version` | string;
    version_number: string;
};

interface Module {
    host: string;
    system: System;
}
export { type Environment };
export default Module;
