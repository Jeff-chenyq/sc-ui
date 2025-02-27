<template>
  <div v-once ref="echartBox" :class="ns.b()"></div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@sc-ui/hooks'
import {
  type EChartsType,
  init as echartInit,
  type EChartsOption
} from 'echarts'
import type { DimensionDefinitionLoose } from 'echarts/types/src/util/types.js'
import { debounce, cloneDeep, groupBy, map, each } from 'lodash-es'
import { bind, clear } from 'size-sensor'

import {
  ref,
  shallowRef,
  onMounted,
  onBeforeUnmount,
  watch,
  reactive
} from 'vue'
import { echartProps, echartEmits, type EchartModel } from './echart'

const ns = useNamespace('echart')

defineOptions({
  name: 'ScEchart'
})

const props = defineProps(echartProps)
const emit = defineEmits(echartEmits)

const echartBox = ref<HTMLElement>()
const chart = shallowRef<EChartsType>()
const resizeHandler = shallowRef<ReturnType<typeof debounce>>()
const data = reactive({
  staticData: props.data,
  echartOption: cloneDeep(props.option), // 因为option时引用类型数据，不同图表可能使用同一个option
  chartSize: 0
})

const getChartSize = () => {
  const { offsetWidth = 0, offsetHeight = 0 } = echartBox.value ?? {}
  return offsetWidth * offsetHeight
}

const resize = () => {
  // TODO: 具体的resize方法，通过setoption实现自适应字体等
  chart.value?.resize()
}

const bindResize = () => {
  data.chartSize = getChartSize()
  // 节流触发resize回调
  resizeHandler.value = debounce(
    () => {
      if (data.chartSize === 0) {
        // 当echartDom的大小从0变为有值时需要重新初始化图表
        chart.value?.setOption({}, true)
        resize()
        chart.value?.setOption(data.echartOption || {}, true)
      } else {
        resize()
      }
      data.chartSize = getChartSize()
    },
    400,
    { leading: true }
  )
  // 在echartDom的大小发生变化时触发resizeHandler，
  // 原理参见http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
  bind(echartBox.value, resizeHandler.value)
}

const init = () => {
  if (chart.value) return
  // 初始化图表
  const echart = echartInit(echartBox.value, props.theme)

  // 绑定resize
  chart.value = echart

  bindResize()
  // 暴露echart实例
  emit('getEchartsInstance', chart.value)
}

function destroy() {
  clear(echartBox.value)
  chart.value?.dispose()
  chart.value = null
}

const dataToDataset = (_data: EchartModel[]): EChartsOption['dataset'] => {
  if (_data && (!Array.isArray(_data) || Array.isArray(_data[0]))) {
    return {
      dimensions: data.echartOption.dimensions as DimensionDefinitionLoose[],
      source: _data
    }
  }
  if (_data?.length === 0) {
    return {
      dimensions: data.echartOption.dimensions as DimensionDefinitionLoose[],
      source: []
    }
  }

  const source: Record<string, any>[] = []
  // 获取所有group
  const groups = [...new Set(map(_data, 'group'))]

  const isSingleGroup = groups.length === 1 && groups[0] === undefined
  const dimensions = (
    isSingleGroup ? ['name', props.singleGroupName] : ['name', ...groups]
  ) as DimensionDefinitionLoose[]
  // 以name分组数据
  const formatData = groupBy(_data, 'name')
  // 循环数据，封装格式
  each(formatData, (obj: any[], key: any) => {
    const srouceField: Record<string, any>[] = obj.map((field) => {
      if (!field) return {}
      const { name, value, group, ...other } = field
      return { [group || props.singleGroupName]: value, ...other }
    })

    source.push({
      name: key,
      ...Object.assign({}, ...srouceField)
    })
  })

  return { dimensions, source }
}

const setData = (_data: EchartModel[]): void => {
  // 标准数据格式直接赋值给dataset.source, 非标准数据格式需要手动赋值到series
  if (props.formatData) {
    props.formatData(_data, chart.value)
    return
  }
  const dataSet = dataToDataset(_data)
  data.echartOption.dataset = dataSet
}

const setStaticData = () => {
  // 设置静态数据
  setData(data.staticData)
}

onMounted(() => {
  init()
  // 如果有静态数据，则先使用数据填充图表
  if (data.staticData) {
    setStaticData()
  }
})

onBeforeUnmount(() => {
  destroy()
})

watch(
  () => props.option,
  (val) => {
    data.echartOption = {
      ...cloneDeep(val),
      dataset: data.echartOption.dataset
    }
  },
  {
    deep: true
  }
)

watch(
  () => data.echartOption,
  (val) => {
    if (!chart.value) return
    if (props.disableCache) {
      chart.value.clear()
      chart.value.setOption(val, true)
      chart.value.hideLoading()
    } else {
      chart.value.setOption(val, false)
    }
  },
  {
    deep: true
  }
)

watch(
  () => props.data,
  (val) => {
    setData(val)
  }
)
</script>
