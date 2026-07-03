import path from "node:path";

/**
 * @param {string} workspaceDir
 * @param {string[]} files
 */
function toWorkspaceRelativePaths(workspaceDir, files) {
  const workspaceRoot = path.join(process.cwd(), workspaceDir);

  return files.map((file) => {
    const absolute = path.isAbsolute(file)
      ? file
      : path.join(process.cwd(), file);

    return path.relative(workspaceRoot, absolute);
  });
}

/**
 * @param {string} workspaceDir
 */
function workspaceEslintFix(workspaceDir) {
  return (files) => {
    const relativeFiles = toWorkspaceRelativePaths(workspaceDir, files);
    const fileArgs = relativeFiles
      .map((file) => JSON.stringify(file))
      .join(" ");

    return `yarn --cwd ${workspaceDir} eslint --fix --max-warnings 0 ${fileArgs}`;
  };
}

/** @type {import("lint-staged").Configuration} */
export default {
  "apps/client/**/*.{js,jsx,ts,tsx}": [
    "prettier --write",
    workspaceEslintFix("apps/client"),
  ],
  "apps/server/**/*.ts": [
    "prettier --write",
    workspaceEslintFix("apps/server"),
  ],
  "packages/eslint-config/**/*.{js,mjs}": [
    "prettier --write",
    workspaceEslintFix("packages/eslint-config"),
  ],
  "*.{json,css,md}": ["prettier --write"],
};
