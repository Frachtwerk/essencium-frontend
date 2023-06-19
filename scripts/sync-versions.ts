/* eslint-disable no-console */
import fs from 'fs-extra'
import path from 'path'
// import readline from 'readline'

const CHARSET = 'utf-8'

const rootDir = path.resolve(__dirname, '../')
const packagesDir = path.resolve(__dirname, '../packages')

const rootPackageJsonPath = path.resolve(__dirname, '../package.json')
const rootPackageJson = JSON.parse(
  fs.readFileSync(rootPackageJsonPath, CHARSET)
)

async function updatePackageVersion(
  packagePath: string,
  version: string
): Promise<void> {
  const packageJsonPath = path.resolve(packagePath, 'package.json')

  if (fs.existsSync(packageJsonPath)) {
    const packageJsonContent = await fs.readFile(packageJsonPath, CHARSET)
    const packageJson = JSON.parse(packageJsonContent)

    packageJson.version = version

    fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 })
  }
}

async function updatePackagesInDir(
  directory: string,
  version: string
): Promise<void> {
  const packageDirs = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => path.resolve(directory, dir.name))

  await Promise.all(packageDirs.map(dir => updatePackageVersion(dir, version)))
}

;(async () => {
  const newVersion = rootPackageJson.version
  await updatePackagesInDir(packagesDir, newVersion)
  await updatePackageVersion(rootDir, newVersion)

  console.log(`Synced all package versions to ${newVersion}`)
})()
