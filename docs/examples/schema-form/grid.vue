<template>
  <sc-schema-form
    :form-item-list="formItemList"
    :model="form"
    :rules="rules"
    :grid-layout="true"
    label-position="top"
  />
  <div>form的值：</div>
  <div class="value">{{ JSON.stringify(form) }}</div>
</template>

<script setup lang="tsx">
import { type SchemaFormItem } from '@jeffchen123/sc-ui'
import { computed, ref } from 'vue'

const form = ref({
  name: '',
  age: 20,
  plateNumber: '',
  status: false,
  startTime: '',
  custom: ''
})

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
}

const formItemList = computed(
  () =>
    [
      {
        compType: 'INPUT',
        prop: 'name',
        label: '姓名',
        formItemProps: {
          gridItem: {
            isFull: true
          }
        }
      },
      {
        compType: 'INPUT_NUMBER',
        prop: 'age',
        label: '年龄'
      },
      {
        compType: 'PLATE_NUMBER',
        prop: 'plateNumber',
        label: '号牌号码'
      },
      {
        compType: 'SWITCH',
        prop: 'status',
        label: '状态'
      },
      {
        compType: 'DATE_PICKER',
        prop: 'startTime',
        label: '开始时间',
        fieldProps: {
          type: 'date',
          format: 'YYYY-MM-DD',
          'value-format': 'YYYY-MM-DD'
        }
      },
      {
        compType: 'CUSTOM',
        prop: 'custom',
        label: '自定义组件',
        render: () => <el-input v-model={form.value.custom}></el-input>
      }
    ] as SchemaFormItem[]
)
</script>

<style lang="scss" scoped>
.value {
  word-break: break-all;
}
</style>
