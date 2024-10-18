import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import eslintPlugin from "@nabla/vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        define: {
            "process.env": env,
        },
        plugins: [react(), eslintPlugin()],
        server: {
            port: 3001,
        },
        resolve: {
            alias: {
                "~": path.resolve(__dirname, "src"),
            },
        },
    };
});
