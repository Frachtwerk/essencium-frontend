import essenciumConfig from '@frachtwerk/eslint-config-essencium'

export default [
  ...essenciumConfig,
  {
    ignores: [
      '.next/**',
      'out/**',
      'next-env.d.ts',
      'next.config.mjs',
      'pages/_app.tsx',
      'pages/**/_meta.js',
      'app/**/_meta.js',
    ],
  },
  {
    files: ['theme.config.tsx'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]
