module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended', // Integrates Prettier with ESLint
    'plugin:@wordpress/eslint-plugin/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error', { tabWidth: 2, useTabs: false }], // Enforce spaces for indentation
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': 'warn',
    'import/order': ['warn', { 'newlines-between': 'always' }],
    curly: 'off',
    camelcase: ['warn', { properties: 'never' }],
    indent: ['error', 2], // Ensures 2-space indentation
  },
};
