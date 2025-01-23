import { buildProps, definePropType } from '@sc-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type DynamicVirtualList from './dynamic-virtual-list.vue'

export interface DynamicPosition {
  index: number
  height: number
  top: number
  bottom: number
}

export interface RenderItem extends DynamicPosition {
  idx: number
  [propName: string]: any
}

export const dynamicVirtualListProps = buildProps({
  /**
   * @description 列表数据
   */
  list: {
    type: definePropType<any[]>([]),
    default: () => []
  },

  /**
   * @description 预估高度
   */
  itemSize: {
    type: Number,
    default: 50
  }
} as const)

export type DynamicVirtualListProps = ExtractPropTypes<
  typeof dynamicVirtualListProps
>

export const dynamicVirtualListEmits = {}

export type DynamicVirtualListEmits = typeof dynamicVirtualListEmits

export type DynamicVirtualListInstance = InstanceType<typeof DynamicVirtualList>
