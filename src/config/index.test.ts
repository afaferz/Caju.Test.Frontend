import Module from "./types";
import provider from ".";

// CommonJS pois aparentemente a versão do Jest não esta suportando o transform do JSON
const localEnv = require("../env/local.json");
const testEnv = require("../env/test.json");
const developmentEnv = require("../env/development.json");
const homologationEnv = require("../env/homologation.json");
const productionEnv = require("../env/production.json");

function checkKeysMatch(selectorFn: (config: Module) => Object) {
    const envs = [
        localEnv,
        testEnv,
        developmentEnv,
        homologationEnv,
        productionEnv,
    ];
    const data = envs.map((value) => selectorFn(value));
    const localKeys = Object.keys(data[0]);

    for (let i = 1; i < data.length; i++) {
        const keys = Object.keys(data[i]);
        keys.forEach((key, index) =>
            expect(localKeys[index]).toStrictEqual(key)
        );
    }
}

describe("config", () => {
    describe("provider", () => {
        const REAL_ENV = process.env;
        beforeEach(() => {
            // Copiando as variáveis reais para reverter ao final do teste
            // Ao rodar o test o process.env.NODE_ENV rodará com a variável 'test'
            jest.resetModules();
            process.env = { ...REAL_ENV };
        });
        afterAll(() => {
            process.env = REAL_ENV;
        });

        it("must equals the scheme beteween env configs", async () => {
            // root
            checkKeysMatch((config) => config);
            // root->host
            checkKeysMatch((config) => config.host);
            // root->system
            checkKeysMatch((config) => config.system);
        });
        it("must retrives correctly configs", async () => {
            const config = await provider().get();
            expect(config).toMatchObject(testEnv);
        });
        it("must retrieve config - local", async () => {
            Object.assign(process.env, {
                ENV_NAME: "local",
                NODE_ENV: "local",
            });
            const config = await provider().get();
            expect(config).toMatchObject(localEnv);
        });
        it("must retrieve config - development", async () => {
            Object.assign(process.env, {
                ENV_NAME: "development",
                NODE_ENV: "development",
            });
            const config = await provider().get();
            expect(config).toMatchObject(developmentEnv);
        });
        it("must retrieve config - homologation", async () => {
            Object.assign(process.env, {
                ENV_NAME: "homologation",
                NODE_ENV: "homologation",
            });
            const config = await provider().get();
            expect(config).toMatchObject(homologationEnv);
        });
        it("must retrieve config - production", async () => {
            Object.assign(process.env, {
                ENV_NAME: "production",
                NODE_ENV: "production",
            });
            const config = await provider().get();
            expect(config).toMatchObject(productionEnv);
        });
        it("must not retrieve config - module", async () => {
            Object.assign(process.env, {
                ENV_NAME: "",
                NODE_ENV: "",
            });
            try {
                await provider().get();
            } catch (error: any) {
                expect(error!.message).toEqual("");
            }
        });
        it("must throw error when config is not found - module missing", async () => {
            // Simulando que o módulo default retorne undefined para cair no catch da configuração
            jest.mock("../env/local.json", () => undefined);
            Object.assign(process.env, {
                ENV_NAME: "",
                NODE_ENV: "",
            });
            await expect(provider().get()).rejects.toThrow(
                "Module config not found"
            );
        });
    });
});
