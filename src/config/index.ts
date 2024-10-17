import singleton from "~/lib/injection/singleton";
import Module, { Environment } from "./types";

interface ConfigProvider {
    get(): Promise<Module>;
}

class ConfigProviderImp implements ConfigProvider {
    async get(): Promise<Module> {
        let module: Module = await import("../env/local.json");
        const module$1: { [K in Environment]: () => Promise<Module> } = {
            test: () => import("../env/test.json"),
            local: () => import("../env/local.json"),
            development: () => import("../env/development.json"),
            homologation: () => import("../env/homologation.json"),
            production: () => import("../env/production.json"),
        };
        if (!module) throw new Error("Module config not found");
        if (process.env.NODE_ENV == "test") {
            module = await module$1["test"]();
            return module;
        }

        if (process.env.ENV_NAME) {
            module = await module$1[
                process.env.ENV_NAME.toLocaleLowerCase() as Environment
            ]();
            return module;
        }
        return module;
    }
}

const provider = singleton(() => new ConfigProviderImp(), []);
export default provider;
export { type ConfigProvider };
