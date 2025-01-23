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

## API

### Attributes

| Name     | Description  | Type      | Default |
| -------- | ------------ | --------- | ------- |
| list     | 数据list     | ^[array]  | []      |
| itemSize | 固定高度     | ^[number] | 50      |
| keep     | 前后缓存个数 | ^[number] | 5       |

### Slots

| Name    | Description               | Type                                     |
| ------- | ------------------------- | ---------------------------------------- |
| default | customize default content | ^[object]`{ data: Record<string, any> }` |
