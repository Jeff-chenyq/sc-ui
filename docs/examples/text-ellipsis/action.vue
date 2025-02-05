<template>
  <sc-text-ellipsis :content="text">
    <template #action="{ expanded }">
      {{ expanded ? '收起' : '展开' }}
    </template>
  </sc-text-ellipsis>
</template>

<script setup lang="ts">
const text =
  '一个人的生命是应该这样度过的：当他回首往事的时候，不因虚度年华而悔恨，也不因碌碌无为而羞耻。这样在临死的时候，他才能够说：“我的生命和全部的经历都献给世界上最壮丽的事业——为人类的解放而斗争。”'
</script>

<style lang="scss" scoped></style>
