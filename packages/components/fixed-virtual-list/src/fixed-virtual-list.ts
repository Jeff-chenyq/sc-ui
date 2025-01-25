import { buildProps, definePropType } from '@sc-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type FixedVirtualList from './fixed-virtual-list.vue'

export const fixedVirtualListProps = buildProps({
  /**
   * @description 列表数据
   */
  list: {
    type: definePropType<any[]>([]),
    default: () => []
  },

  /**
   * @description 固定高度
   */
  itemSize: {
    type: Number,
    default: 50
  },

  /**
   * @description 前后缓存个数
   */
  keep: {
    type: Number,
    default: 5
  },

  dataKey: {
    type: String,
    required: true
  }
} as const)

export type FixedVirtualListProps = ExtractPropTypes<
  typeof fixedVirtualListProps
>

export const fixedVirtualListEmits = {}

export type FixedVirtualListEmits = typeof fixedVirtualListEmits

export type FixedVirtualListInstance = InstanceType<typeof FixedVirtualList>
