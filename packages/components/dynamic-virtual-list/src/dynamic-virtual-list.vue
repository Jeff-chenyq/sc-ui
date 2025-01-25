<template>
  <div ref="container" :class="ns.b()" @scroll="handleScroll">
    <div
      :class="ns.e('placeholder')"
      :style="{ height: `${itemsHeight}px` }"
    ></div>

    <div
      :style="{
        transform: `translate3d(0, ${positions[startIndex].top}px, 0)`
      }"
    >
      <div
        v-for="item in renderList"
        ref="itemRef"
        :key="item.idx"
        :data-index="item.idx"
      >
        <slot :data="item"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@sc-ui/hooks'
import { computed, onMounted, onUpdated, ref, watch } from 'vue'
import { dynamicVirtualListProps } from './dynamic-virtual-list'
import type { DynamicPosition, RenderItem } from './dynamic-virtual-list'

const ns = useNamespace('dynamic-virtual-list')

defineOptions({
  name: 'ScDynamicVirtualList'
})

const props = defineProps(dynamicVirtualListProps)

// ====================== ref =======================
const container = ref<HTMLDivElement>()
const itemRef = ref<HTMLDivElement[]>()

// ====================== data =======================
// 位置信息
const positions = ref<DynamicPosition[]>([])

const height = ref(0)
// 开始index
const startIndex = ref(0)

// ====================== computed =======================
const itemsHeight = computed(
  () => positions.value[positions.value.length - 1].bottom
)

const endIndex = computed(() => {
  for (let i = startIndex.value; i < positions.value.length; i++) {
    const item = positions.value[i]
    const start = positions.value[startIndex.value]
    if (item.bottom > start.bottom + height.value) {
      return i
    }
  }

  return positions.value.length - 1
})

// 渲染列表
const renderList = computed(() =>
  props.list.slice(startIndex.value, endIndex.value + 1).map((item, index) => {
    return {
      idx: startIndex.value + index,
      ...item,
      ...positions.value[startIndex.value + index]
    } as RenderItem
  })
)

watch(
  () => props.list,
  (val) => {
    initPositions(val)
  },
  {
    immediate: true
  }
)

onMounted(() => {
  height.value = container.value!.clientHeight
})

onUpdated(() => {
  updatePositions()
})

// ====================== function =======================

/**
 * 初始化位置
 */
function initPositions(list: any[]) {
  startIndex.value = 0
  positions.value = list.map((_, index) => {
    return {
      index,
      height: props.itemSize,
      top: index * props.itemSize,
      bottom: (index + 1) * props.itemSize
    }
  })
}

/**
 * scroll
 */
function handleScroll(e: Event) {
  requestAnimationFrame(() => {
    const scrollTop = (e.target as HTMLDivElement)!.scrollTop
    startIndex.value = getStartIndex(scrollTop)
  })
}

/**
 * 二分查找
 * @param scrollTop
 */
// function getStartIndex(scrollTop: number, list: Position[]) {
//   const mid = Math.floor((list.length - 1) / 2);
//   const item = list[mid];

//   if (item.top < scrollTop && item.bottom >= scrollTop) {
//     return item;
//   } else if (item.bottom < scrollTop) {
//     return getStartIndex(scrollTop, list.slice(mid + 1));
//   } else {
//     return getStartIndex(scrollTop, list.slice(0, mid));
//   }
// }

function getStartIndex(scrollTop: number) {
  let left = 0
  let right = positions.value.length - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (positions.value[mid].bottom === scrollTop) {
      return mid + 1
    } else if (positions.value[mid].bottom < scrollTop) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return left
}

/**
 * 更新位置
 */
function updatePositions() {
  itemRef.value?.forEach((el) => {
    const index = Number(el.getAttribute('data-index'))
    const position = positions.value[index]

    const height = el.getBoundingClientRect().height
    const diff = height - position.height

    if (diff === 0) return

    position.height = height
    position.bottom = position.bottom + diff

    for (let i = index + 1; i < positions.value.length; i++) {
      positions.value[i].top = positions.value[i].top + diff
      positions.value[i].bottom = positions.value[i].bottom + diff
    }
  })
}
</script>
