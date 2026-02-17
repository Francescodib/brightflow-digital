import { dirname } from "path";
import { fileURLToPath } from "url";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "coverage/**",
      "next-env.d.ts",
      "*.config.{js,ts,mjs}",
    ],
  },

  // Base TypeScript configuration
  ...tseslint.configs.recommended,

  // Next.js plugin
  {
    name: "next.js",
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // Custom project rules
  {
    name: "project-overrides",
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  }
);
