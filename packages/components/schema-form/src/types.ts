import { VNode } from 'vue'

export const compTypeList = [
  'INPUT',
  'INPUT_NUMBER',
  'SELECT',
  'SWITCH',
  'CHECKBOX_GROUP',
  'RADIO_GROUP',
  'TIME_PICKER',
  'DATE_PICKER',
  'PLATE_NUMBER',
  'CUSTOM'
] as const

export type CompType = (typeof compTypeList)[number]

export type FormItemHiddenFn = () => boolean

export interface SchemaFormItem {
  compType: CompType
  label: string
  prop: string
  hidden?: boolean | FormItemHiddenFn

  /**
   * @description formItem 的 props
   */
  formItemProps?: {
    gridItem?: {
      /**
       * @description 是否占满整行(当此参数为true时，gridItem中的gridStyle将失效)
       */
      isFull?: boolean
      /**
       * @description grid-column样式
       */
      gridStyle?: string
    }
    [key: string]: any
  }

  /**
   * @description formItem 的 slots
   */
  formItemSlots?: {
    label?: (label: string) => VNode[]
    error?: (error: string) => VNode[]
  }

  /**
   * @description field 的 props
   */
  fieldProps?: {
    /**
     * @description select radio-group checkbox-group 的选项list
     */
    optionList?: any[]
    labelKey?: string
    valueKey?: string
    [key: string]: any
  }

  /**
   * @description field 的 slots
   */
  fieldSlots?: {
    [key: string]: (...args: any[]) => VNode[]
  }

  /**
   * @description 自定义渲染，当compType为CUSTOM时必传
   */
  render?: () => VNode[]
}
