<template>
  <div class="wrap">
    <ScDynamicVirtualList :list="list">
      <template #default="{ data: { size, i } }">
        <div :style="{ height: `${size}px` }">{{ `${i} ${size}px` }}</div>
      </template>
    </ScDynamicVirtualList>
  </div>
</template>

<script setup lang="ts">
import { ScDynamicVirtualList } from '@sc-ui/components'
import '@sc-ui/components/dynamic-virtual-list/style'

const list = Array.from({ length: 10000 }).map((_, index) => {
  return {
    size: Math.floor(50 + Math.random() * 5),
    i: index
  }
})
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 300px;
  border: 1px solid #e2e2e2;
}
</style>
