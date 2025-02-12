---
title: SchemaFormContainer
lang: zh-CN
---

# SchemaFormContainer

查询容器组件

## 基础使用

:::demo
schema-form-container/basic
:::

## API

### Attributes

透传所有 SchemaForm 支持属性(默认已开启grid布局和自适应宽度，一般只需调整 grid-fr属性)

| Name             | Description          | Type       | Default |
| ---------------- | -------------------- | ---------- | ------- |
| on-reset         | 重置按钮点击触发方法 | ^[funcion] | -       |
| on-search        | 搜索按钮点击触发方法 | ^[funcion] | -       |
| default-collapse | 初始收缩状态         | ^[boolean] | true    |
| collapse-height  | form收缩时的高度     | ^[number]  | 32      |

### Slots

| Name        | Description    | Type                                |
| ----------- | -------------- | ----------------------------------- |
| collapseBtn | 自定义展开收起 | ^[object]`{ isCollapse : boolean }` |
| searchBtn   | 自定义按钮搜索 | -                                   |
