<template>
  <el-button :type="'primary'" @click="reset">重置</el-button>
  <sc-schema-form
    ref="formRef"
    :form-item-list="formItemList"
    :model="form"
    :rules="rules"
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
  custom: '',
  gender: '',
  job: '',
  hobby: []
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
          label: '自定义姓名'
        },
        formItemSlots: {
          label: (label) => <span>{label}</span>
          // error: (error) => <span>{'render' + error}</span>
        },
        fieldProps: {
          placeholder: '请输入姓名 自定义',
          onInput: (e: string) => {
            console.log(e, 'input')
          }
        },
        fieldSlots: {
          prefix: () => <div>prefix</div>,
          suffix: () => <div>suffix</div>,
          prepend: () => <div>prepend</div>,
          append: () => <div>append</div>
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
      },
      {
        compType: 'SELECT',
        prop: 'gender',
        label: '性别',
        fieldProps: {
          optionList: [
            {
              label: '男',
              value: 'male'
            },
            {
              label: '女',
              value: 'female'
            }
          ]
          // 默认值
          // valueKey: 'value',
          // labelKey: 'label'
        }
      },
      {
        compType: 'RADIO_GROUP',
        prop: 'job',
        label: '职业',
        fieldProps: {
          optionList: [
            {
              name: '老师',
              code: '1'
            },
            {
              name: '学生',
              code: '2'
            }
          ],
          valueKey: 'code',
          labelKey: 'name'
        }
      },
      {
        compType: 'CHECKBOX_GROUP',
        prop: 'hobby',
        label: '爱好',
        fieldProps: {
          optionList: [
            {
              label: '唱歌',
              value: '1'
            },
            {
              label: '跳舞',
              value: '2'
            },
            {
              label: 'rap',
              value: '3'
            },
            {
              label: '打篮球',
              value: '4'
            }
          ]
        }
      }
    ] as SchemaFormItem[]
)

const formRef = ref()

function reset() {
  formRef.value?.resetFields?.()
}
</script>

<style lang="scss" scoped>
.value {
  word-break: break-all;
}
</style>
