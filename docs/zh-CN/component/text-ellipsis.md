---
title: TextEllipsis
lang: zh-CN
---

# TextEllipsis

文本省略

## 基础使用

:::demo
text-ellipsis/basic
:::

## 自定义展示行数

:::demo
text-ellipsis/rows
:::

## 展开/收起

:::demo
text-ellipsis/expand
:::

## 自定义操作内容

:::demo
text-ellipsis/action
:::

## 展示气泡

:::demo
text-ellipsis/tip
:::

## API

### Attributes

| Name          | Description                                | Type       | Default |
| ------------- | ------------------------------------------ | ---------- | ------- |
| content       | 文本内容                                   | ^[string]  | —       |
| rows          | 展示行数                                   | ^[number]  | 1       |
| expand-text   | 展开操作的文案                             | ^[string]  | —       |
| collapse-text | 收起操作的文案                             | ^[string]  | —       |
| dots          | 省略号的文本内容                           | ^[string]  | ...     |
| showTip       | 是否展示tip（当有展示操作文案时不展示tip） | ^[boolean] | false   |

### Slots

| Name   | Description    | Type                              |
| ------ | -------------- | --------------------------------- |
| action | 自定义操作内容 | ^[object]`{ expanded : boolean }` |
