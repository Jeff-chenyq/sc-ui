import { buildProps, definePropType } from '@sc-ui/utils'
import { formProps } from 'element-plus'
import type { ExtractPropTypes } from 'vue'
import type SchemaForm from './schema-form'
import { SchemaFormItem } from './types'

export const schemaFormProps = buildProps({
  ...formProps,

  gridLayout: {
    type: Boolean,
    default: false
  },

  /**
   * @description 一行几列
   */
  gridCols: {
    type: definePropType<number | 'auto'>([Number, String]),
    default: 2
  },

  gridGap: {
    type: String,
    default: '16px'
  },

  /**
   * @description `repeat(auto-fill, minmax(${fr}px, auto))` 当 gridCols 为 auto 时,自适应列宽
   */
  gridFr: {
    type: Number,
    default: 250
  },

  labelSuffix: {
    ...formProps.labelSuffix,
    default: ':'
  },

  model: {
    type: Object,
    default: () => ({})
  },

  formItemList: {
    type: definePropType<SchemaFormItem[]>(Array),
    required: true
  },

  isAutoLabelWidth: {
    type: Boolean,
    default: true
  },

  getInstance: {
    type: Function
  }
} as const)

export type SchemaFormProps = ExtractPropTypes<typeof schemaFormProps>

export const schemaFormEmits = {}

export type SchemaFormEmits = typeof schemaFormEmits

export type SchemaFormInstance = InstanceType<typeof SchemaForm>
