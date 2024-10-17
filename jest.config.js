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
    moduleFileExtensions: ["js", "ts", "tsx", "json"]
    //   setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
