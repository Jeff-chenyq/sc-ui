<template>
  <div class="wrap">
    <ScFixedVirtualList :list="list" :data-key="'id'">
      <template #default="{ data: { id } }">
        <div>{{ id }}</div>
      </template>
    </ScFixedVirtualList>
  </div>
</template>

<script setup lang="ts">
const list = Array.from({ length: 10000 }).map((_, i) => ({ id: i }))
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 300px;
  border: 1px solid #e2e2e2;
}
</style>
