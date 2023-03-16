const OFF = "off"
const ERROR = "error"
const WARN = "warn"

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "object-curly-spacing": [ERROR, 'always'],
    "semi": [ERROR, "never"],
    "no-unused-vars": OFF,
    "@typescript-eslint/no-unused-vars": [ERROR]
  },
}
