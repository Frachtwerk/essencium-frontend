module.exports = {
  extends: ['@frachtwerk/eslint-config-essencium/legacy'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    'dist',
    '.next/',
    'out/',
    'pages/_app.tsx',
    'pages/**/_meta.js',
    'next.config.mjs',
    '*.config.{js,mjs}',
    'vercel.json',
    'next-env.d.ts',
  ],
  overrides: [
    {
      files: ['theme.config.tsx'],
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
  ],
}