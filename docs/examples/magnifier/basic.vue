<template>
  <div class="wrap">
    <ScMagnifier :src="imgSrc" />
  </div>
</template>

<script setup lang="ts">
const imgSrc =
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 300px;
}
</style>
