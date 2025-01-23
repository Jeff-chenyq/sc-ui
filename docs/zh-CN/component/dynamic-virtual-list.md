---
title: DynamicVirtualList
lang: zh-CN
---

# DynamicVirtualList

动态高度虚拟列表

## 基础使用

:::demo
dynamic-virtual-list/basic
:::

## API

### Attributes

| Name     | Description | Type      | Default |
| -------- | ----------- | --------- | ------- |
| list     | 数据list    | ^[array]  | []      |
| itemSize | 预估高度    | ^[number] | 50      |

### Slots

| Name    | Description               | Type                                     |
| ------- | ------------------------- | ---------------------------------------- |
| default | customize default content | ^[object]`{ data: Record<string, any> }` |
