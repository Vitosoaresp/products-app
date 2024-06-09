/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */

/** @type { PrettierConfig } */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: "../../apps/web/tailwind.config.js",
  jsxSingleQuote: false,
  singleQuote: true,
  arrowParens: "avoid",
  trailingComma: "all",
  endOfLine: "lf",
}

export default config