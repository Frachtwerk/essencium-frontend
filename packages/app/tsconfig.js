/**
 * DO NOT EDIT 'tsconfig.json' DIRECTLY, ALWAYS USE THIS FILE
 *
 * Dependening on whether the '--development' flag is passed or not,
 * we want to use the local lib package or the one from node_modules.
 * This is because we want to use the local lib package when running
 * the app in development mode, but we want to use the one from
 * node_modules when building the app for production.
 *
 * Taking the local lib package will give us instant type inference
 * during development in the app package.
 */
const isDevelopment = process.argv.includes('--development')

export default {
  extends: '../../tsconfig.json',
  compilerOptions: {
    composite: true,
    target: 'ES6',
    esModuleInterop: false,
    isolatedModules: true,
    noEmit: true,
    types: ['vite-plugin-sentry/client'],
    resolveJsonModule: true,
    module: 'ESNext',
    paths: {
      '@/*': ['./src/*'],
      lib: [isDevelopment ? '../lib/src' : './node_modules/lib'],
      translations: [
        isDevelopment ? '../translations/src' : './node_modules/translations',
      ],
    },
  },
  include: ['tsconfig.js', 'src/**/*.ts', 'src/**/*.js', 'src/**/*.tsx'],
  references: [{ path: './tsconfig.node.json' }],
}
