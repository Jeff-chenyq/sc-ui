---
title: FixedVirtualList
lang: zh-CN
---

# FixedVirtualList

固定高度虚拟列表

## 基础使用

:::demo
fixed-virtual-list/basic
:::

## 滚动至某一个列表项

:::demo
fixed-virtual-list/scroll-to
:::

## API

### Attributes

| Name     | Description         | Type      | Default |
| -------- | ------------------- | --------- | ------- |
| list     | 数据list            | ^[array]  | []      |
| itemSize | 固定高度            | ^[number] | 50      |
| keep     | 前后缓存个数        | ^[number] | 5       |
| dataKey  | 列表项唯一key(必填) | ^[string] | —       |

### Slots

| Name    | Description    | Type                                     |
| ------- | -------------- | ---------------------------------------- |
| default | 自定义渲染内容 | ^[object]`{ data: Record<string, any> }` |

### Exposes

| Name     | Description    | Type                                   |
| -------- | -------------- | -------------------------------------- |
| scrollTo | 滚动到可视区域 | ^[Function]`(dataKey: string) => void` |
