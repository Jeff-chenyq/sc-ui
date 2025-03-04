---
title: 配置表单
lang: zh-CN
---

# SchemaForm

配置表单(有些基础组件封装的可能满足不了需求，这个时候可以使用CUSTOM 自定义渲染，个性化开发)

## 基础使用

:::demo
schema-form/basic
:::

## 使用grid布局

:::demo
schema-form/grid
:::

## API

### Attributes

透传ElForm 所有的属性

| Name                | Description                                                                                                                     | Type                            | Default |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ------- |
| model               | 表单数据                                                                                                                        | ^[Object]`<Record<string, any>` | -       |
| label-suffix        | 表单域标签的后缀                                                                                                                | ^[string]                       | :       |
| form-item-list      | 表单域配置项（SchemFormItem参考类型声明注释）                                                                                   | ^[Array]`SchemaFormItem[]`      | []      |
| grid-layout         | 是否开启grid布局                                                                                                                | ^[boolean]                      | false   |
| grid-cols           | 一行几列                                                                                                                        | ^[number] / ^[auto]             | 2       |
| grid-gap            | grid gap属性                                                                                                                    | ^[string]                       | 16px    |
| grid-fr             | 当 gridCols 为 auto 时,自适应列宽宽度`grid-template-columns: repeat(auto-fill, minmax(${fr}px, auto))`                          | ^[number]                       | 250     |
| is-auto-label-width | 是否自动计算label的宽度（计算方式为所有label中最多字数 + 2）em，当自定义label，或者其他情况，导致labelWidth不准，可以关闭该配置 | ^[boolean]                      | true    |

### Methods

直接按照ElForm的方法使用即可(参考基础使用中的重置表单)

## 类型声明

<details>
  <summary>显示类型声明</summary>

```ts
type CompType =
  | 'INPUT'
  | 'INPUT_NUMBER'
  | 'SELECT'
  | 'SWITCH'
  | 'CHECKBOX_GROUP'
  | 'RADIO_GROUP'
  | 'TIME_PICKER'
  | 'DATE_PICKER'
  | 'PLATE_NUMBER'
  | 'CUSTOM'

type FormItemHiddenFn = () => boolean

interface SchemaFormItem {
  compType: CompType
  label: string
  prop: string
  /**
   * @description 是否隐藏当前item
   */
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
```

</details>
