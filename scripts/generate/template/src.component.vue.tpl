<template>
  <div :class="ns.b()"><%= pascalCaseName %></div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@sc-ui/hooks'
import { <%= camelCaseName %>Props } from './<%= name %>'

const ns = useNamespace('<%= name %>')

defineOptions({
  name: 'Sc<%= pascalCaseName %>'
})

defineProps(<%= camelCaseName %>Props)
</script>
