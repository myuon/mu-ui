module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "css-reorder"],
  rules: {
    "react/self-closing-comp": "error",
    "css-reorder/property-reorder": "error",
    "react/display-name": "off",
    "react/prop-types": "off",
  },
  ignorePatterns: [".eslintrc.js"],
};
