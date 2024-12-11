import { buildProps } from '@sc-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type Button from './button.vue'

export const buttonProps = buildProps({
  type: {
    type: String,
    default: ''
  }
} as const)

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export const buttonEmits = {}

export type ButtonEmits = typeof buttonEmits

export type ButtonInstance = InstanceType<typeof Button>
