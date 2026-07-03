import globals from "globals";
import { defineConfig } from "eslint/config";

import { createBaseConfig } from "./base.mjs";

/**
 * @param {{
 *   tsconfigRootDir: string;
 *   ignores?: string[];
 *   globals?: import('eslint').Linter.Globals;
 *   includeJestGlobals?: boolean;
 * }} options
 */
export function createNodeConfig(options) {
  const {
    tsconfigRootDir,
    ignores = [],
    globals: customGlobals,
    includeJestGlobals = false,
  } = options;

  const defaultGlobals = {
    ...globals.node,
    ...(includeJestGlobals ? globals.jest : {}),
  };

  return defineConfig(
    ...createBaseConfig({
      tsconfigRootDir,
      ignores,
      globals: customGlobals ?? defaultGlobals,
    })
  );
}
