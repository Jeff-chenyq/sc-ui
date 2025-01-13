import { buildProps, definePropType } from '@sc-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type PlateNumber from './plate-number.vue'

export const plateNumberProps = buildProps({
  value: {
    type: definePropType<string>(String),
    default: ''
  }
} as const)

export type PlateNumberProps = ExtractPropTypes<typeof plateNumberProps>

export const plateNumberEmits = {}

export type PlateNumberEmits = typeof plateNumberEmits

export type PlateNumberInstance = InstanceType<typeof PlateNumber>
