import essenciumConfig from '@frachtwerk/eslint-config-essencium'

export default [
  ...essenciumConfig,
  {
    // App-specific ignores
    ignores: ['next-env.d.ts', 'next.config.js', '.next/**'],
  },
  {
    // CommonJS config files
    files: ['*.cjs', '**/*.cjs'],
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
    // Runtime config and other public JS files
    files: ['public/**/*.js'],
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      'no-console': 'off', // Console ist in public files OK
    },
  },
  {
    // E2E and Playwright specific rules
    files: ['e2e/**/*.ts', 'playwright/**/*.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]
