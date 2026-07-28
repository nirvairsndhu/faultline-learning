import { globalIgnores } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  globalIgnores([".next/**", "node_modules/**", "playwright-report/**", "test-results/**"]),
  nextPlugin.flatConfig.recommended,
];
