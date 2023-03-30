const OFF = 'off'
const ERROR = 'error'
const WARN = 'warn'

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'object-curly-spacing': [ERROR, 'always'],
    'semi': [ERROR, 'never'],
    'no-unused-vars': OFF,
    'quote-props': [ERROR, 'consistent-as-needed'],
    'no-debugger': ERROR,
    'arrow-parens': [ERROR, 'as-needed'],
    '@typescript-eslint/no-unused-vars': [ERROR],
    '@typescript-eslint/no-namespace': OFF,
    'import/order': [ERROR, {
      groups: [
        'builtin',
        'external',
        ['type', 'internal', 'sibling'],
        'index',
      ],
      'pathGroupsExcludedImportTypes': ['builtin'],
      'newlines-between': 'always',
      'pathGroups': [
        { pattern: 'config/**', group: 'internal' },
        { pattern: 'exceptions/**', group: 'internal' },
        { pattern: 'modules/**', group: 'internal' },
        { pattern: 'services/**', group: 'internal' },
        { pattern: 'utils/**', group: 'internal' },
        { pattern: 'web/**', group: 'internal' },
      ],
    }]
  },
}
