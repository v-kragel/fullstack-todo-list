import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

import { packageBoundaryRules } from "./boundaries.mjs";

export default defineConfig(
  { ignores: ["eslint.config.mjs"] },
  eslint.configs.recommended,
  eslintConfigPrettier,
  { rules: packageBoundaryRules }
);
