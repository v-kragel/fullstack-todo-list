/** @type {import('eslint').Linter.RulesRecord} */
export const sharedRules = {
  "no-console": "warn",
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/no-unused-vars": [
    "error",
    { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
  ],
  "@typescript-eslint/no-floating-promises": "error",
  "@typescript-eslint/no-misused-promises": "error",
  "@typescript-eslint/await-thenable": "error",
  "@typescript-eslint/consistent-type-imports": [
    "error",
    { prefer: "type-imports" },
  ],
  "no-restricted-syntax": [
    "error",
    {
      selector: "TSEnumDeclaration",
      message: "Use `as const` objects instead of enum.",
    },
  ],
};
