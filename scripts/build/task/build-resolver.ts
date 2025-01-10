import path from 'path'
import { epRoot } from '@sc-ui/build'
import { rollup } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import { buildConfigEntries } from '../build-info'

export async function buildResolver() {
  const bundle = await rollup({
    input: path.resolve(epRoot, 'resolver.ts'),
    plugins: [
      esbuild({
        sourceMap: true
      })
    ],
    external: ['unplugin-vue-components'],
    treeshake: false
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
}
