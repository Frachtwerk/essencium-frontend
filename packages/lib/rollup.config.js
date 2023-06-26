import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

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
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.build.json' }),
      terser(),
    ],
    external: [
      '@emotion/react',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/react-fontawesome',
      '@mantine/core',
      '@mantine/dates',
      '@mantine/hooks',
      '@mantine/modals',
      '@mantine/spotlight',
      '@tabler/icons',
      '@tanstack/react-query',
      '@tanstack/react-table',
      'i18next',
      'react',
      'react-dom',
      'next',
      'react-i18next',
      'next-i18next',
      'react-i18next',
      'zod',
      'react-hook-form',
      '@hookform/resolvers',
      'react-json-tree',
    ],
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
]
