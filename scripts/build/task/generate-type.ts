import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { execa } from 'execa'
import { glob } from 'fast-glob'
import { copy, remove } from 'fs-extra'
import { projRoot, buildOutput } from '../utils/path'
import { pathRewriter } from '../utils/rollup'

export const generateTypes = async () => {
  // --declaration： 生成 .d.ts 文件，这些文件包含 TypeScript 类型声明。
  // --emitDeclarationOnly： 只生成类型声明文件，而不生成 JavaScript 输出文件。
  // --declarationDir： 指定生成的类型声明文件的输出目录。

  await execa(
    'vue-tsc',
    [
      '-p',
      'tsconfig.web.json',
      '--declaration',
      '--emitDeclarationOnly',
      '--declarationDir',
      'dist/types'
    ],
    {
      cwd: projRoot
    }
  )

  const typesDir = path.resolve(buildOutput, 'types', 'packages')
  const filePaths = await glob(`**/*.d.ts`, {
    cwd: typesDir,
    absolute: true
  })

  const rewriteTasks = filePaths.map(async (filePath) => {
    const content = await readFile(filePath, 'utf-8')

    await writeFile(filePath, pathRewriter('esm')(content), 'utf-8')
  })

  await Promise.all(rewriteTasks)
  const sourceDir = path.resolve(typesDir, 'sc-ui')
  await copy(sourceDir, typesDir)
  await remove(sourceDir)
}
