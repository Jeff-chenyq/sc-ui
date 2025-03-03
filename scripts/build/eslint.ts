import { eslintOutput, projRoot } from '@sc-ui/build'
import { execa } from 'execa'
import fs from 'fs-extra'
import { series } from 'gulp'

const clean = async () => {
  await Promise.all([fs.remove(eslintOutput)])
}

export const buildEslint = async () => {
  await execa('pnpm', ['run', '-C', 'packages/eslint-config', 'build'], {
    cwd: projRoot
  })
}

export default series(clean, buildEslint)
