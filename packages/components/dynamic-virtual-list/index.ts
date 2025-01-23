import { withInstall } from '@sc-ui/utils'
import type { SFCWithInstall } from '@sc-ui/utils'
import DynamicVirtualList from './src/dynamic-virtual-list.vue'

export const ScDynamicVirtualList: SFCWithInstall<typeof DynamicVirtualList> =
  withInstall(DynamicVirtualList)
export default ScDynamicVirtualList

export * from './src/dynamic-virtual-list'
