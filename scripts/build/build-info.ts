import path from 'path'
import { ModuleFormat } from 'rollup'
import type { OptionsPaths } from 'rollup'
import { PKG_NAME } from './utils/consts'
import { epOutput } from './utils/path'
import { generatePaths } from './utils/rollup'

export const target = 'esnext'

export const modules = ['esm', 'cjs'] as const

export type Module = (typeof modules)[number]

export interface BuildInfo {
  module: 'ESNext' | 'CommonJS'
  format: ModuleFormat
  ext: 'mjs' | 'cjs' | 'js'
  output: {
    name: string
    path: string
  }
  paths?: OptionsPaths
  bundle: {
    path: string
  }
}

export const buildConfig: Record<Module, BuildInfo> = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(epOutput, 'es')
    },
    bundle: {
      path: `${PKG_NAME}/es`
    }
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'cjs',
    output: {
      name: 'lib',
      path: path.resolve(epOutput, 'lib')
    },
    paths: generatePaths(),
    bundle: {
      path: `${PKG_NAME}/lib`
    }
  }
}

export const buildConfigEntries = Object.entries(
  buildConfig
) as BuildConfigEntries

export type BuildConfigEntries = [Module, BuildInfo][]

export type BuildConfig = typeof buildConfig
