---
title: Magnifier
lang: zh-CN
---

# Magnifier

放大镜

## 基础使用

:::demo
magnifier/basic
:::

## 加载失败

:::demo
magnifier/error
:::

## API

### Attributes

| Name          | Description            | Type                                                                    | Default                   |
| ------------- | ---------------------- | ----------------------------------------------------------------------- | ------------------------- |
| src           | 图片地址               | ^[string]                                                               | -                         |
| object-fit    | 图片适应容器           | ^[enum]`'' \| 'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | contain                   |
| mouseMaskSize | 鼠标跟随阴影尺寸       | ^[object]`{width: number;height: number;}`                              | `{ width:75, height:50 }` |
| viewSize      | 放大镜的尺寸（宽，高） | ^[object]`{width: number;height: number;}`                              | `{width:600, height:400}` |
| scale         | 放大倍数               | ^[number]                                                               | 5                         |

### Slots

| Name  | Description              |
| ----- | ------------------------ |
| error | 自定义图像加载失败的内容 |
