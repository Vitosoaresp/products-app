/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@products-app/eslint-config/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
