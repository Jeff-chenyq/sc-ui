import { buildConfig, Module } from '../build-info'
import { PKG_NAME, PKG_PREFIX } from './consts'
import { epPackage, projRoot } from './path'

export const getPackageDependencies = (dir = epPackage) => {
  // eslint-disable-next-line
  const { version, dependencies = {}, peerDependencies = {} } = require(dir)
  return {
    version,
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies)
  }
}

export const generateExternal = (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getPackageDependencies()

  const packages: string[] = peerDependencies

  if (options.full) {
    packages.push(
      '@vue',
      'element-plus',
      '@element-plus/icons-vue',
      ...dependencies
    )
  }

  return (id: string) => {
    return packages.some(
      (pkg) => id === pkg || (options.full && id.startsWith(`${pkg}/`))
    )
  }
}

export const generatePaths = () => {
  const paths = [['lodash-es', 'lodash']]

  return (id: string) => {
    for (const [oldPath, newPath] of paths) {
      if (id.startsWith(oldPath)) {
        return id.replace(oldPath, newPath)
      }
    }

    return ''
  }
}

export const excludeFiles = (files: string[]) => {
  const excludes = [
    'node_modules',
    'test',
    'mock',
    'gulpfile',
    'dist',
    'eslint-config',
    'stylelint-config',
    'resolver'
  ]
  return files.filter((path) => {
    const position = path.startsWith(projRoot) ? projRoot.length : 0
    return !excludes.some((exclude) => path.includes(exclude, position))
  })
}

export function formatBundleFilename(
  name: string,
  minify: boolean,
  ext: string
) {
  return `${name}${minify ? '.min' : ''}.${ext}`
}

export const pathRewriter = (module: Module) => {
  const config = buildConfig[module]
  return (id: string) => {
    id = id.replaceAll(`${PKG_PREFIX}/theme-chalk`, `${PKG_NAME}/theme-chalk`)
    id = id.replaceAll(`${PKG_PREFIX}/`, `${config.bundle.path}/`)
    return id
  }
}
