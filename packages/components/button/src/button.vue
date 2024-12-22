<template>
  <div :class="ns.b()">Button 123</div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@sc-ui/hooks'
import { buttonProps } from './button'

const ns = useNamespace('button')

defineOptions({
  name: 'ScButton'
})

defineProps(buttonProps)
</script>
