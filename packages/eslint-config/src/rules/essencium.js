/**
 * Essencium-specific ESLint rule overrides
 * These rules override defaults based on Frachtwerk's coding standards
 */

export const essenciumOverrides = {
  // React
  'react/react-in-jsx-scope': 'off',
  'react/jsx-props-no-spreading': 'off',
  'react/require-default-props': 'off',
  'react/prop-types': 'off',
  'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
  'react/function-component-definition': [
    'error',
    {
      namedComponents: ['function-declaration', 'arrow-function'],
      unnamedComponents: 'arrow-function',
    },
  ],
  'react/jsx-no-bind': [
    'error',
    {
      allowFunctions: true,
      allowArrowFunctions: true,
    },
  ],

  // TypeScript
  '@typescript-eslint/explicit-function-return-type': [
    'error',
    {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true,
    },
  ],
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-non-null-assertion': 'warn',

  'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
  'consistent-return': 'off',
  'dot-notation': 'off',
  '@typescript-eslint/dot-notation': 'off',

  // Prettier Integration
  'prettier/prettier': 'warn',
}
