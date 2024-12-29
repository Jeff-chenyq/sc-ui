import { withInstall } from '@sc-ui/utils'
import type { SFCWithInstall } from '@sc-ui/utils'
import PlateNumber from './src/plate-number.vue'

export const ScPlateNumber: SFCWithInstall<typeof PlateNumber> =
  withInstall(PlateNumber)
export default ScPlateNumber

export * from './src/plate-number'
