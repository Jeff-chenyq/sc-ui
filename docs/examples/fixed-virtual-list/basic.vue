<template>
  <div class="wrap">
    <ScFixedVirtualList :list="list">
      <template #default="{ data }">
        <div>{{ data }}</div>
      </template>
    </ScFixedVirtualList>
  </div>
</template>

<script setup lang="ts">
const list = Array.from({ length: 10000 }).map((_, i) => i)
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 300px;
  border: 1px solid #e2e2e2;
}
</style>
