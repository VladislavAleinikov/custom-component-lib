import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: eslintReact,
    },
  },
  { ignores: ["node_modules/", "build/", "coverage", "**/*.stories.tsx", "**/*.test.tsx"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
      parserOptions: {
        project: ["tsconfig.json"],
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
      quotes: ["error", "double"],
      "jsx-quotes": ["error", "prefer-double"],
      "prefer-const": "error",
      indent: ["warn", 2],
      "max-len": ["error", { code: 120 }],
      "comma-dangle": ["error", "always-multiline"],
      semi: ["warn", "always"],
      "max-params": ["error", 3],
      "react/jsx-curly-brace-presence": [
        "warn",
        { props: "never", children: "never" },
      ],
      "react/function-component-definition": [
        "warn",
        { namedComponents: "arrow-function" },
      ],
      "react/self-closing-comp": ["error", { component: true, html: true }],
    },
  }
);
