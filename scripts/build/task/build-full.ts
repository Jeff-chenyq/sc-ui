import path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { rollup } from 'rollup'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import vueDefineOptions from 'unplugin-vue-define-options/rollup'
import { target } from '../build-info'
import { PKG_CAMELCASE_NAME } from '../utils/consts'
import { epOutput, epRoot } from '../utils/path'
import { formatBundleFilename, generateExternal } from '../utils/rollup'

const build = async (minify: boolean) => {
  const input = path.resolve(epRoot, 'index.ts')

  const bundle = await rollup({
    input,
    plugins: [
      vueDefineOptions(),
      vue(),
      vueJsx(),
      nodeResolve(),
      commonjs(),
      esbuild({
        target,
        sourceMap: minify,
        treeShaking: true
      }),
      minify
        ? minifyPlugin({
            target,
            sourceMap: true
          })
        : undefined,
      json()
    ],
    treeshake: true,
    external: generateExternal({ full: false })
  })

  await Promise.all([
    bundle.write({
      format: 'esm',
      file: path.resolve(
        epOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'mjs')
      ),
      sourcemap: minify
    }),
    bundle.write({
      format: 'umd',
      file: path.resolve(
        epOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'js')
      ),
      exports: 'named',
      name: PKG_CAMELCASE_NAME,
      globals: {
        vue: 'Vue',
        'element-plus': 'ElementPlus',
        '@element-plus/icons-vue': 'ElementPlusIconsVue',
        echarts: 'ECharts'
      },
      sourcemap: minify
    })
  ])
}

export const buildFull = async () => {
  await Promise.all([build(false), build(true)])
}
