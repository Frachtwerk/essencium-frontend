import essenciumConfig from '@frachtwerk/eslint-config-essencium'

export default [
  ...essenciumConfig,
  {
    // Types-specific ignores
    ignores: ['dist/**'],
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
