import { projRoot } from '@sc-ui/build'
import { execa } from 'execa'
import { series } from 'gulp'

export const buildEslint = async () => {
  await execa('pnpm', ['run', '-C', 'packages/eslint-config', 'build'], {
    cwd: projRoot
  })
}

export default series(buildEslint)
