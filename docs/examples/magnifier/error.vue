<template>
  <div class="wrap">
    <ScMagnifier :src="imgSrc">
      <template #error>加载失败</template>
    </ScMagnifier>
  </div>
</template>

<script setup lang="ts">
const imgSrc = 'https://xxx.jpeg'
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 300px;
}
</style>
