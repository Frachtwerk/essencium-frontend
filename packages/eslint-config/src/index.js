/**
 * @frachtwerk/eslint-config-essencium v3.0.0
 * ESLint v9 Flat Config for Essencium-based projects
 *
 * Copyright (C) 2024 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 * Licensed under LGPL-3.0
 */

import js from '@eslint/js'
import typescript from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import { essenciumOverrides } from './rules/essencium.js'

// Basic-config
const baseConfig = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parser: typescript.parser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      project: true,
      tsconfigRootDir: process.cwd(),
    },
    globals: {
      // Browser
      window: 'readonly',
      document: 'readonly',
      navigator: 'readonly',
      console: 'readonly',
      fetch: 'readonly',
      localStorage: 'readonly',
      sessionStorage: 'readonly',
      location: 'readonly',
      history: 'readonly',

      // Node.js
      global: 'readonly',
      process: 'readonly',
      Buffer: 'readonly',
      __dirname: 'readonly',
      __filename: 'readonly',
      exports: 'writable',
      module: 'writable',
      require: 'readonly',

      // ES2022
      globalThis: 'readonly',

      // Testing
      describe: 'readonly',
      it: 'readonly',
      test: 'readonly',
      expect: 'readonly',
      beforeEach: 'readonly',
      afterEach: 'readonly',
      beforeAll: 'readonly',
      afterAll: 'readonly',
      jest: 'readonly',
      vi: 'readonly',

      // React
      React: 'readonly',
      JSX: 'readonly',
    },
  },
  plugins: {
    react,
    'react-hooks': reactHooks,
    'jsx-a11y': jsxA11y,
    'simple-import-sort': simpleImportSort,
    '@typescript-eslint': typescript.plugin,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

// main-config
const mainConfig = {
  ...baseConfig,
  rules: {
    // JavaScript
    'no-console': 'warn',
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': ['error', 'always'],
    'prefer-arrow-callback': [
      'error',
      { allowNamedFunctions: false, allowUnboundThis: true },
    ],
    'prefer-template': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],

    // React
    'react/display-name': ['off', { ignoreTranspilerName: false }],
    'react/jsx-boolean-value': ['error', 'never', { always: [] }],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-key': ['error', { checkFragmentShorthand: true }],
    'react/jsx-max-props-per-line': [
      'error',
      { maximum: 1, when: 'multiline' },
    ],
    'react/jsx-no-bind': [
      'error',
      {
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowFunctions: false,
        allowBind: false,
        ignoreDOMComponents: true,
      },
    ],
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
    'react/jsx-no-undef': 'error',
    'react/jsx-pascal-case': ['error', { allowAllCaps: true, ignore: [] }],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-danger': 'warn',
    'react/no-deprecated': 'error',
    'react/no-unknown-property': 'error',
    'react/prop-types': [
      'error',
      { ignore: [], customValidators: [], skipUndeclared: false },
    ],
    'react/react-in-jsx-scope': 'error',
    'react/self-closing-comp': 'error',

    // React Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // JSX A11y
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/interactive-supports-focus': 'error',
    'jsx-a11y/label-has-associated-control': 'error',
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-autofocus': 'error',
    'jsx-a11y/no-distracting-elements': 'error',
    'jsx-a11y/no-noninteractive-element-interactions': 'error',
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/scope': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',

    // Import
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // Essencium
    ...essenciumOverrides,
  },
}

// TypeScript
const typescriptConfig = {
  files: ['**/*.ts', '**/*.tsx'],
  rules: {
    // TypeScript
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',

    'no-unused-vars': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: true,
        classes: true,
        variables: true,
      },
    ],
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
  },
}

const testConfig = {
  files: [
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/__tests__/**/*',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-console': 'off',
  },
}

// Config-Files
const configFilesConfig = {
  files: [
    '*.config.{js,ts}',
    '**/*.config.{js,ts}',
    'eslint.config.{js,mjs}',
    'prettier.config.{js,mjs,cjs}',
    'tailwind.config.{js,ts}',
    'next.config.{js,mjs}',
    'vite.config.{js,ts}',
    'vitest.config.{js,ts}',
  ],
  rules: {
    '@typescript-eslint/no-require-imports': 'off',
    'global-require': 'off',
    'no-console': 'off',
  },
}

// Standard-Export
const essenciumConfig = [
  // ESLint Recommended
  js.configs.recommended,

  // TypeScript Recommended
  ...typescript.configs.recommended,

  // Main
  mainConfig,

  // TypeScript
  typescriptConfig,

  // Config-Files
  configFilesConfig,

  // Prettier
  prettierPlugin,

  // Globale Ignores
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.next/**',
      'out/**',
      'coverage/**',
      '*.min.js',
      '*.min.css',
      'public/static/**',
      '**/*.d.ts',
    ],
  },
]

export default essenciumConfig

export {
  baseConfig,
  mainConfig,
  typescriptConfig,
  testConfig,
  configFilesConfig,
}
