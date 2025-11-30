import js from "@eslint/js"
import tslint from "typescript-eslint"
import globals from "globals"
import prettier from "eslint-config-prettier"

export default [
  js.configs.recommended,
  ...tslint.configs.recommended,
  prettier,
  {
    files: ["**/*.js", "**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    ignores: [
      "node_modules",
      "**/node_modules", // should be ignored by default anyway
      "dist/**/*",
      //"**/*.js", // ignore compiled js files
      "!eslint.config.js", // but not this file
    ],
  },
  {
    rules: {
      "one-var": ["warn", "never"],
      "@typescript-eslint/consistent-indexed-object-style": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
]
