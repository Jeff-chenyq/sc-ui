import { withInstall } from '@sc-ui/utils'
import type { SFCWithInstall } from '@sc-ui/utils'
import Echart from './src/echart.vue'

export const ScEchart: SFCWithInstall<typeof Echart> = withInstall(Echart)
export default ScEchart

export * from './src/echart'
