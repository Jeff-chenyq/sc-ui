import { buildProps, definePropType } from '@sc-ui/utils'
import type { EChartsType, EChartsOption } from 'echarts'
import type { ExtractPropTypes } from 'vue'
import type Echart from './echart.vue'

export type EchartModel = {
  name: number | string
  value: number | string
  group?: number | string
  [propName: string]: any
}

export const echartProps = buildProps({
  data: {
    type: definePropType<EchartModel[]>(Array),
    default: () => []
  },

  option: {
    type: definePropType<EChartsOption>(Object),
    default: () => ({})
  },

  theme: {
    type: definePropType<'' | 'dark'>(String),
    default: ''
  },

  /**
   * 是否禁止缓存，每次变化都重绘画布
   */
  disableCache: {
    type: Boolean,
    default: true
  },

  formatData: {
    type: definePropType<(data: EchartModel[], instance: EChartsType) => void>(
      Function
    )
  },

  singleGroupName: {
    type: String,
    default: 'group'
  }
} as const)

export type EchartProps = ExtractPropTypes<typeof echartProps>

export const echartEmits = {
  getEchartsInstance: (instance: EChartsType) => instance
}

export type EchartEmits = typeof echartEmits

export type EchartInstance = InstanceType<typeof Echart>
