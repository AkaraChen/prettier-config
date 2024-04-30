#!/usr/bin/env node

import { isMonorepoRoot } from '@akrc/monorepo-tools'
import consola from 'consola'
import { ensureDependencyInstalled } from 'nypm'
import fs from 'fs'
import fsp from 'fs/promises'
import { PackageJson } from 'type-fest'

const searchDir = process.cwd()
consola.info(`Running install script in ${searchDir}...`)

const isRoot = await isMonorepoRoot(searchDir)
if (isRoot) {
    consola.success(`Monorepo detected.`)
}

await ensureDependencyInstalled('prettier', {
    workspace: isRoot,
    dev: true,
    cwd: searchDir,
})
consola.success(`Prettier installed.`)

const prettierConfigPath = `${searchDir}/.prettierrc`
if (fs.existsSync(prettierConfigPath)) {
    const result = await consola.prompt(
        `Prettier config already exists, do you want to overwrite it?`,
        {
            type: 'confirm',
        },
    )

    if (result) {
        await fsp.rm(prettierConfigPath)
        consola.success(`Prettier config removed.`)
    } else {
        consola.error(`Aborted.`)
        process.exit(1)
    }
}

await fsp.writeFile(prettierConfigPath, `"prettier-config-akrc"`)
consola.success(`Prettier config created.`)

const packageJsonPath = `${searchDir}/package.json`
try {
    const packageJson = JSON.parse(
        await fsp.readFile(packageJsonPath, 'utf-8'),
    ) as PackageJson

    await fsp.writeFile(
        packageJsonPath,
        JSON.stringify(
            {
                ...packageJson,
                scripts: {
                    ...packageJson.scripts,
                    format: 'prettier --write .',
                },
            } as PackageJson,
            null,
            2,
        ),
    )
} catch (error) {
    consola.error(`Error updating package.json: ${error}`)
    process.exit(1)
}
