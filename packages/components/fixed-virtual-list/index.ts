import { withInstall } from '@sc-ui/utils'
import type { SFCWithInstall } from '@sc-ui/utils'
import FixedVirtualList from './src/fixed-virtual-list.vue'

export const ScFixedVirtualList: SFCWithInstall<typeof FixedVirtualList> =
  withInstall(FixedVirtualList)
export default ScFixedVirtualList

export * from './src/fixed-virtual-list'
