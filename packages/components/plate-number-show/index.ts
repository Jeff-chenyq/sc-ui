import { withInstall } from '@sc-ui/utils'
import type { SFCWithInstall } from '@sc-ui/utils'
import PlateNumberShow from './src/plate-number-show.vue'

export const ScPlateNumberShow: SFCWithInstall<typeof PlateNumberShow> =
  withInstall(PlateNumberShow)
export default ScPlateNumberShow

export * from './src/plate-number-show'
