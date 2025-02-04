import { buildProps, definePropType, isString } from '@sc-ui/utils'
import { popoverProps } from 'element-plus'
import type { ExtractPropTypes } from 'vue'
import type PlateNumber from './plate-number.vue'

export const plateNumberProps = buildProps({
  modelValue: {
    type: definePropType<string>(String),
    default: ''
  },

  placement: {
    ...popoverProps.placement,
    default: 'bottom-start'
  },

  clearable: {
    type: Boolean,
    default: true
  },

  placeholder: {
    type: String,
    default: '请输入号牌号码'
  },

  disabled: {
    type: Boolean,
    default: false
  }
} as const)

export type PlateNumberProps = ExtractPropTypes<typeof plateNumberProps>

export const plateNumberEmits = {
  'update:modelValue': (value: string) => isString(value)
}

export type PlateNumberEmits = typeof plateNumberEmits

export type PlateNumberInstance = InstanceType<typeof PlateNumber>
