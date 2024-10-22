/** @type {import('jest').Config} */
export default {
    verbose: true,
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": ["ts-jest", { isolatedModules: true }],
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
        "^~/(.+)": "<rootDir>/src/$1",
    },
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(test).[jt]s?(x)"],
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
    moduleFileExtensions: ["js", "ts", "tsx", "json"],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
