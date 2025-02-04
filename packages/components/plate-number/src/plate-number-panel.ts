import { buildProps, definePropType, isString, isNumber } from '@sc-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type PlateNumberPanel from './plate-number-panel.vue'

export const plateNumberPanelProps = buildProps({
  modelValue: {
    type: definePropType<string>(String),
    default: ''
  }
} as const)

export type PlateNumberPanelProps = ExtractPropTypes<
  typeof plateNumberPanelProps
>

export const plateNumberPanelEmits = {
  'update:modelValue': (value: string) => isString(value),
  panelInputClick: (index: number) => isNumber(index),
  deleteIconClick: () => true
}

export type PlateNumberPanelEmits = typeof plateNumberPanelEmits

export type PlateNumberPanelInstance = InstanceType<typeof PlateNumberPanel>
