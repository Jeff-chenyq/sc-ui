import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import glob from 'fast-glob'
import { rollup } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import vueDefineOptions from 'unplugin-vue-define-options/rollup'
import { target, buildConfigEntries } from '../build-info'
import { epRoot, pkgRoot } from '../utils/path'
import { generateExternal, excludeFiles } from '../utils/rollup'

export const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  )

  const bundle = await rollup({
    input,
    plugins: [
      vueDefineOptions(),
      vue(),
      vueJsx(),
      // 用于解析Node.js模块。它可以让Rollup打包时使用Node.js模块（包括外部依赖），而不仅仅是ES模块
      nodeResolve(),
      commonjs(),
      esbuild({
        target,
        sourceMap: true,
        loaders: {
          '.vue': 'ts'
        }
        // minify: false,
        // loaders: {
        //   '.vue': 'ts'
        // },
        // tsconfig: path.resolve(__dirname, '../../tsconfig.json')
      }),
      json()
    ],
    treeshake: false,
    external: generateExternal({ full: true })
  })

  await Promise.all(
    buildConfigEntries.map(([module, config]) => {
      return bundle.write({
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: epRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
        paths: config.paths || undefined
      })
    })
  )

  // await Promise.all([
  //   bundle.write({
  //     format: 'esm', // 模块格式
  //     dir: outputEsm, // 输出目录
  //     // exports: undefined, // 导出模式
  //     preserveModules: true, // 与原始模块创建相同的文件
  //     preserveModulesRoot: 'src',
  //     sourcemap: true, // 生成 sourcemap
  //     entryFileNames: '[name].mjs' // 生成文件名
  //   }),
  //   bundle.write({
  //     format: 'cjs',
  //     dir: outputCjs,
  //     exports: 'named',
  //     preserveModules: true,
  //     preserveModulesRoot: 'src',
  //     sourcemap: true,
  //     entryFileNames: '[name].js'
  //   })
  // ])
}
