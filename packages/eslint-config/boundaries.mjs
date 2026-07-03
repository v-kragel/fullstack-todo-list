/** @type {import('eslint').Linter.RulesRecord} */
export const clientAppBoundaryRules = {
  "no-restricted-imports": [
    "error",
    {
      paths: [
        {
          name: "server",
          message: "Client must not import the server application.",
        },
      ],
      patterns: [
        {
          group: [
            "**/apps/server/**",
            "../server/**",
            "../../server/**",
            "../../../server/**",
          ],
          message: "Client must not import from the server application.",
        },
      ],
    },
  ],
};

/** @type {import('eslint').Linter.RulesRecord} */
export const serverAppBoundaryRules = {
  "no-restricted-imports": [
    "error",
    {
      paths: [
        {
          name: "client",
          message: "Server must not import the client application.",
        },
      ],
      patterns: [
        {
          group: [
            "**/apps/client/**",
            "../client/**",
            "../../client/**",
            "../../../client/**",
          ],
          message: "Server must not import from the client application.",
        },
      ],
    },
  ],
};

/** @type {import('eslint').Linter.RulesRecord} */
export const packageBoundaryRules = {
  "no-restricted-imports": [
    "error",
    {
      patterns: [
        {
          group: ["**/apps/client/**", "**/apps/server/**"],
          message: "Packages must not import from applications.",
        },
      ],
    },
  ],
};
