import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: false,
      },
    ],
    plugins: [
      babel({
        plugins: ['babel-plugin-react-compiler'],
      }),
      peerDepsExternal(),
      postcss({
        extract: false,
        modules: true,
        use: [],
      }),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.build.json' }),
      terser(),
    ],
    external: [
      'dayjs',
      '@frachtwerk/essencium-types',
      '@hookform/resolvers',
      '@mantine/core',
      '@mantine/dates',
      '@mantine/hooks',
      '@mantine/spotlight',
      '@tabler/icons-react',
      '@tanstack/react-table',
      'html2canvas-pro',
      'i18next',
      'next',
      'next-i18next',
      'react',
      'react-dom',
      'react-hook-form',
      'react-i18next',
      'react-window',
      'zod',
    ],
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
  {
    input: 'src/globals.css',
    output: [{ file: 'dist/globals.css', format: 'es' }],
    plugins: [
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
  {
    input: 'src/theme.css',
    output: [{ file: 'dist/theme.css', format: 'es' }],
    plugins: [
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
]
