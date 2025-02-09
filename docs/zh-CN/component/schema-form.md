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

| Name           | Description      | Type                            | Default |
| -------------- | ---------------- | ------------------------------- | ------- |
| model          | 表单数据         | ^[Object]`<Record<string, any>` | {}      |
| label-suffix   | 表单域标签的后缀 | ^[string]                       | :       |
| form-item-list | 表单域配置项     | ^[Array]                        | []      |

### Methods

直接按照ElForm的方法使用即可(参考基础使用中的重置表单)
