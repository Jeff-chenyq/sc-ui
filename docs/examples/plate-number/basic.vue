<template>
  <sc-plate-number v-model="value" class="number" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
<style lang="scss" scoped>
.number {
  width: 200px;
}
</style>
