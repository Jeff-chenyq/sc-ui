import { projRoot } from '@sc-ui/build'
import { execa } from 'execa'
import { series } from 'gulp'

export const buildStylelint = async () => {
  await execa('pnpm', ['run', '-C', 'packages/stylelint-config', 'build'], {
    cwd: projRoot
  })
}

export default series(buildStylelint)
