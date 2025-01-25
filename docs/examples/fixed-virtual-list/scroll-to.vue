<template>
  <div class="operate">
    <el-input v-model.trim="num" clearable></el-input>
    <el-button type="primary" @click="scrollTo">scrollTo</el-button>
  </div>
  <div class="wrap">
    <ScFixedVirtualList ref="fixedList" :list="list" :data-key="'id'">
      <template #default="{ data: { id } }">
        <div>{{ id }}</div>
      </template>
    </ScFixedVirtualList>
  </div>
</template>

<script setup lang="ts">
import type { FixedVirtualListInstance } from '@jeffchen123/sc-ui'
import { ref } from 'vue'

const list = Array.from({ length: 10000 }).map((_, i) => ({ id: i + '' }))

const num = ref('')
const fixedList = ref<FixedVirtualListInstance>()

function scrollTo() {
  fixedList.value?.scrollTo(num.value)
}
</script>
<style lang="scss" scoped>
.operate {
  display: flex;
  margin-bottom: 12px;

  .el-input {
    margin-right: 12px;
  }
}

.wrap {
  width: 100%;
  height: 300px;
  border: 1px solid #e2e2e2;
}
</style>
