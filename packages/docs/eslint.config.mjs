import essenciumConfig from '@frachtwerk/eslint-config-essencium'

export default [
  ...essenciumConfig,
  {
    // Docs-specific ignores
    ignores: ['.next/**', 'out/**'],
  },
  {
    // Next.js config files
    files: ['next.config.js', '*.config.{js,ts}'],
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