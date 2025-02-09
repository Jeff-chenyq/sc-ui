<template>
  <ElConfigProvider :locale="local">
    <Layout>
      <!-- <template #home-hero-info-before>2</template>
    <template #home-hero-info>3</template>
    <template #home-hero-info-after>4</template>
    <template #home-hero-actions-after>5</template>
    <template #home-hero-image>6</template>
    <template #home-hero-after>7</template>
    <template #home-features-before>8</template>
    <template #home-features-after>9</template> -->
    </Layout>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import local from 'element-plus/es/locale/lang/zh-cn'
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>

<style lang="scss" scoped></style>
