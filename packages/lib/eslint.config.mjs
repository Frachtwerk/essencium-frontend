import essenciumConfig from '@frachtwerk/eslint-config-essencium'

export default [
  ...essenciumConfig,
  {
    // Lib-specific ignores
    ignores: ['dist/**', 'vitest.config.ts'],
  },
  {
    // CommonJS config files
    files: ['*.cjs', '**/*.cjs', 'rollup.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        module: 'readonly',
        exports: 'writable',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
  },
  {
    // Build config files
    files: ['*.config.{js,ts}', 'rollup.config.js'],
    languageOptions: {
      parserOptions: {
        project: false,
      },
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]
