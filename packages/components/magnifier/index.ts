import { withInstall } from '@sc-ui/utils'
import type { SFCWithInstall } from '@sc-ui/utils'
import Magnifier from './src/magnifier.vue'

export const ScMagnifier: SFCWithInstall<typeof Magnifier> =
  withInstall(Magnifier)
export default ScMagnifier

export * from './src/magnifier'
