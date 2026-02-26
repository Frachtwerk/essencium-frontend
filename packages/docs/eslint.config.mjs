import essenciumConfig from '@frachtwerk/eslint-config-essencium'

export default [
  ...essenciumConfig,
  {
    ignores: [
      'dist/**',
      '.next/**',
      'out/**',
      'pages/_app.tsx',
      'pages/**/_meta.js',
    ],
  },
  {
    files: ['next.config.{js,mjs}', '*.config.{js,ts,mjs}', 'theme.config.tsx'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]
