/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@products-app/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"]
  }
};
