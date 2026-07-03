import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig } from "eslint/config";

import { createBaseConfig } from "./base.mjs";

const defaultIgnores = [
  ".next/**",
  "out/**",
  "build/**",
  "next-env.d.ts",
  "eslint.config.mjs",
  "postcss.config.mjs",
];

/**
 * @param {{
 *   tsconfigRootDir: string;
 *   ignores?: string[];
 * }} options
 */
export function createNextConfig(options) {
  const { tsconfigRootDir, ignores = [] } = options;

  return defineConfig(
    ...nextVitals,
    ...nextTs,
    ...createBaseConfig({
      tsconfigRootDir,
      ignores: [...defaultIgnores, ...ignores],
      includeEslintRecommended: false,
    })
  );
}
