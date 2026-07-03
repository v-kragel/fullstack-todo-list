import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

import { sharedRules } from "./shared-rules.mjs";

/**
 * @param {{
 *   tsconfigRootDir: string;
 *   ignores?: string[];
 *   globals?: import('eslint').Linter.Globals;
 *   includeEslintRecommended?: boolean;
 * }} options
 */
export function createBaseConfig(options) {
  const {
    tsconfigRootDir,
    ignores = [],
    globals = {},
    includeEslintRecommended = true,
  } = options;

  const configs = [{ ignores }];

  if (includeEslintRecommended) {
    configs.push(eslint.configs.recommended);
  }

  configs.push(
    ...tseslint.configs.recommendedTypeChecked,
    eslintConfigPrettier,
    {
      languageOptions: {
        globals,
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
    },
    {
      rules: sharedRules,
    }
  );

  return configs;
}
