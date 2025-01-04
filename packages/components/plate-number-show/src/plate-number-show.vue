<template>
  <div :class="ns.b()">PlateNumberShow</div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@sc-ui/hooks'
import { plateNumberShowProps } from './plate-number-show'

const ns = useNamespace('plate-number-show')

defineOptions({
  name: 'ScPlateNumberShow'
})

defineProps(plateNumberShowProps)
</script>
