import { schemaFormProps } from '@sc-ui/components'
import { buildProps } from '@sc-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type SchemaFormContainer from './schema-form-container'

export const schemaFormContainerProps = buildProps({
  ...schemaFormProps,

  onReset: {
    type: Function
  },

  onSearch: {
    type: Function
  },

  defaultCollapse: {
    type: Boolean,
    default: true
  },

  collapseHeight: {
    type: Number,
    default: 32
  }
} as const)

export type SchemaFormContainerProps = ExtractPropTypes<
  typeof schemaFormContainerProps
>

export const schemaFormContainerEmits = {}

export type SchemaFormContainerEmits = typeof schemaFormContainerEmits

export type SchemaFormContainerInstance = InstanceType<
  typeof SchemaFormContainer
>
