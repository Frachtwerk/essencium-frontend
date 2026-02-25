/**
 * Legacy CommonJS compatibility for ESLint v8 projects
 * This maintains backward compatibility during migration
 * 
 * Copyright (C) 2024 Frachtwerk GmbH
 */

// This is essentially the current index.cjs content for v8 compatibility
module.exports = {
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'simple-import-sort'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/jsx-no-bind': [
      'error',
      { allowFunctions: true, allowArrowFunctions: true },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'prettier/prettier': 'warn',
    'import/extensions': [
      2,
      'ignorePackages',
      {
        '': 'never',
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.config.js',
          '**/*.config.ts',
          '**/vitest.config.app.ts',
        ],
      },
    ],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    'consistent-return': 'off',
    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': ['off'],
  },
};