<template>
  <div class="wrap">
    <ScEchart
      :data="data"
      :option="option"
      :single-group-name="'统计次数'"
      @get-echarts-instance="onInstance"
    />
  </div>
</template>

<script setup lang="ts">
import { type EChartsOption } from 'echarts'

const data = [
  { name: 'Mon', value: 260 },
  { name: 'Tue', value: 150 },
  { name: 'Wed', value: 218 },
  { name: 'Thu', value: 224 },
  { name: 'Fri', value: 230 },
  { name: 'Sat', value: 147 },
  { name: 'Sun', value: 135 }
]

const option = {
  xAxis: {
    type: 'category'
  },
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  yAxis: {
    type: 'value'
  },
  series: [
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
