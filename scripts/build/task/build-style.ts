import { execa } from 'execa'
import { projRoot } from '../utils/path'

export const buildStyle = async () => {
  await execa('pnpm', ['run', '-C', 'packages/theme-chalk', 'build'], {
    cwd: projRoot
  })
}
