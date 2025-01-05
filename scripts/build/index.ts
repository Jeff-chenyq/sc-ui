import { copyFile, mkdir } from 'fs/promises'
import path from 'path'
import { copy } from 'fs-extra'
import { parallel, series } from 'gulp'
import type { TaskFunction } from 'gulp'
import { buildConfig, Module } from './build-info'
import {
  buildFull,
  buildModules,
  clean,
  generateTypes,
  buildStyle,
  buildResolver
} from './task'
import { buildOutput, epPackage, epOutput, projRoot } from './utils/path'

/**
 * 将types文件放入 es，lib文件夹下
 */
export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(buildOutput, 'types', 'packages')
  const copyTypes = (moduel: Module) => {
    return () => copy(src, buildConfig[moduel].output.path)
  }

  return parallel(copyTypes('cjs'), copyTypes('esm'))(done)
}

export const copyFiles = () =>
  Promise.all([
    copyFile(epPackage, path.join(epOutput, 'package.json')),
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(epOutput, 'README.md')
    )
    // copyFile(
    //   path.resolve(projRoot, 'typings', 'global.d.ts'),
    //   path.resolve(epOutput, 'global.d.ts')
    // )
  ])

export const copyFullStyle = async () => {
  await mkdir(path.resolve(epOutput, 'dist'), { recursive: true })
  await copyFile(
    path.resolve(epOutput, 'theme-chalk/index.css'),
    path.resolve(epOutput, 'dist/index.css')
  )
}

export default series(
  series(
    clean,
    parallel(buildModules, buildFull, buildResolver, generateTypes),
    series(buildStyle, copyFullStyle)
  ),
  parallel(copyTypesDefinitions, copyFiles)
)
