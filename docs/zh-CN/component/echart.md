---
title: Echart
lang: zh-CN
---

# Echart

## 基础使用

:::demo
echart/basic
:::

## 多组

:::demo
echart/multi
:::

## API

### Attributes

| Name              | Description                                            | Type                    | Default |
| ----------------- | ------------------------------------------------------ | ----------------------- | ------- |
| data              | 数据（当图标比较复杂时，可以不传，直接在option中配置） | ^[Array]`EchartModel[]` | []      |
| option            | 图表配置项                                             | ^[Object]`EchartOption` | {}      |
| single-group-name | 单组，且未配置group 时，group默认值                    | ^[string]               | group   |

## 类型声明

<details>
  <summary>显示类型声明</summary>

```ts
type EchartModel = {
  name: number | string
  value: number | string
  group?: number | string
  [propName: string]: any
}
```

</details>
