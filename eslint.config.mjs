import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        Swiper: "readonly",
        google: "readonly",
      },
    },
  },
  {
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn",
      "no-console": "warn",
    },
  },
]);
