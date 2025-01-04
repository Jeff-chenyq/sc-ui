import { buildProps } from '@sc-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type PlateNumberShow from './plate-number-show.vue'

export const plateNumberShowProps = buildProps({} as const)

export type PlateNumberShowProps = ExtractPropTypes<typeof plateNumberShowProps>

export const plateNumberShowEmits = {}

export type PlateNumberShowEmits = typeof plateNumberShowEmits

export type PlateNumberShowInstance = InstanceType<typeof PlateNumberShow>
