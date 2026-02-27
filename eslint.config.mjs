import essenciumConfig from '@frachtwerk/eslint-config-essencium'

export default [
  ...essenciumConfig,
  {
    // Root-specific ignores
    ignores: [
      'packages/*/dist/**',
      'packages/*/build/**', 
      'packages/*/.next/**',
      'packages/*/out/**',
      'packages/*/coverage/**',
      'node_modules/**',
    ],
  },
  {
    // Scripts and config files
    files: ['scripts/**/*.ts', '*.config.{js,ts}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.config.js',
            '**/*.config.ts', 
            './scripts/sync-versions.ts',
            './scripts/seed-db.ts',
          ],
        },
      ],
    },
  },
]