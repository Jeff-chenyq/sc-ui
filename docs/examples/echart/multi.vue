<template>
  <div class="wrap">
    <ScEchart
      :data="data"
      :option="option"
      @get-echarts-instance="onInstance"
    />
  </div>
</template>

<script setup lang="ts">
import { type EChartsOption } from 'echarts'

const data = [
  { name: 'Mon', value: 260, group: 'one' },
  { name: 'Tue', value: 150, group: 'one' },
  { name: 'Wed', value: 218, group: 'one' },
  { name: 'Thu', value: 224, group: 'one' },
  { name: 'Fri', value: 230, group: 'one' },
  { name: 'Sat', value: 147, group: 'one' },
  { name: 'Sun', value: 135, group: 'one' },
  { name: 'Mon', value: 360, group: 'two' },
  { name: 'Tue', value: 250, group: 'two' },
  { name: 'Wed', value: 318, group: 'two' },
  { name: 'Thu', value: 324, group: 'two' },
  { name: 'Fri', value: 330, group: 'two' },
  { name: 'Sat', value: 247, group: 'two' },
  { name: 'Sun', value: 235, group: 'two' }
]

const option = {
  xAxis: {
    type: 'category'
  },
  yAxis: {
    type: 'value'
  },
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  series: [
    {
      type: 'line'
    },
    {
      type: 'line'
    }
  ]
} as EChartsOption

function onInstance(val) {
  console.log(val, 'val')
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 300px;
}
</style>
