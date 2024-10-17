module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:import/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:@typescript-eslint/recommended",
        "eslint-config-prettier",
        "plugin:react-hooks/recommended",
    ],
    settings: {
        react: {
            version: "detect",
        },
        "import/resolver": {
            typescript: {
                paths: ["src"],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
            node: {
                paths: ["src"],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
    },
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "import/no-named-as-default": 0,
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "import/no-unresolved": ["error", { ignore: ["^@/"] }],
        "react/display-name": "off",
        "@typescript-eslint/ban-types": "off",
        "import/named": "off",
        "react-hooks/exhaustive-deps": "warn",
    },
};
