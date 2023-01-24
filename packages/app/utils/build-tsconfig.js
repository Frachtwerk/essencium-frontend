import glob from 'fast-glob'
import { writeFile } from 'fs/promises'
import { resolve } from 'path'

const cwd = process.env.PWD

async function outputConfigJson(file) {
  if (!file) {
    throw new Error('no file parameter provided')
  }

  const outputFile = file.replace(/\.js$/, '.json')

  if (!cwd) {
    throw new Error('current working directory (cwd) is undefined')
  }

  // use import() so both CJS and ESM work
  const config = await import(resolve(cwd, file))

  // accept default export to make it easier with ESM
  await writeFile(
    outputFile,
    JSON.stringify(config.default || config, undefined, 2)
  )
}

async function findConfigsInCwd() {
  const files = await glob('tsconfig*.js', { cwd })

  await Promise.all(files.map(outputConfigJson))
}

findConfigsInCwd()
