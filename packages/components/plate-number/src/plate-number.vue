<template>
  <div :class="ns.b()">PlateNumber</div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@sc-ui/hooks'
import { plateNumberProps } from './plate-number'

const ns = useNamespace('plate-number')

defineOptions({
  name: 'ScPlateNumber'
})

defineProps(plateNumberProps)
</script>
