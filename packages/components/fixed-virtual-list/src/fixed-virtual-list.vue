<template>
  <div ref="container" :class="ns.b()" @scroll="handleScroll">
    <div
      :class="ns.e('placeholder')"
      :style="{ height: `${itemsHeight}px` }"
    ></div>

    <div
      :style="{ transform: `translate3d(0, ${startIndex * itemSize}px, 0)` }"
    >
      <div
        v-for="(item, idx) in renderList"
        :key="item[dataKey] ?? idx"
        :style="{ height: `${itemSize}px` }"
      >
        <slot :data="item"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@sc-ui/hooks'
import { computed, onMounted, ref, watch } from 'vue'
import { fixedVirtualListProps } from './fixed-virtual-list'

const ns = useNamespace('fixed-virtual-list')

defineOptions({
  name: 'ScFixedVirtualList'
})

const props = defineProps(fixedVirtualListProps)

const container = ref<HTMLElement | null>(null)
const containerHeight = ref(0)
const scrollTop = ref(0)

const startIndex = computed(() => {
  const index = Math.floor(scrollTop.value / props.itemSize) - props.keep
  return Math.max(index, 0)
})

const endIndex = computed(() => {
  const interval = Math.ceil(containerHeight.value / props.itemSize)
  const index = startIndex.value + interval + props.keep
  return Math.min(index, props.list.length - 1)
})

const renderList = computed(() =>
  props.list.slice(startIndex.value, endIndex.value + 1)
)

const itemsHeight = computed(() => props.list.length * props.itemSize)

watch(
  () => props.list,
  () => {
    scrollTop.value = 0
  }
)

onMounted(() => {
  getHeight(20)
})

function getHeight(count: number) {
  containerHeight.value = container.value?.clientHeight || 0
  if (!containerHeight.value && count) {
    requestAnimationFrame(() => {
      getHeight(count--)
    })
  } else if (!containerHeight.value && !count) {
    console.error('未获取到容器高度！！！')
  }
}

function handleScroll(e: Event) {
  scrollTop.value = (e.target as HTMLDivElement)!.scrollTop
}

function scrollTo(dataKey: string) {
  const existIndex = props.list.findIndex(
    (item) => item[props.dataKey] === dataKey
  )

  if (existIndex === -1) {
    console.error('未找到对应列表项')
    return
  }

  container.value.scrollTop = scrollTop.value =
    Math.min(existIndex, props.list.length - 1 - props.keep) * props.itemSize
}

defineExpose({
  /**
   * @description 滚动到可视区域
   */
  scrollTo
})
</script>
