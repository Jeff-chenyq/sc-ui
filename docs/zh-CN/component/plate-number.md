---
title: PlateNumber
lang: zh-CN
---

# PlateNumber

车牌组件
(keyboard快捷输入，暂时没有严格按照车牌规则校验，后续优化)

## 基础使用

:::demo
plate-number/basic
:::

## API

### Attributes

| Name                  | Description      | Type                                                                                                                                                                        | Default        |
| --------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| model-value / v-model | 绑定值           | ^[string]                                                                                                                                                                   | —              |
| placement             | 出现位置         | ^[enum]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | bottom-start   |
| placeholder           | 占位符           | ^[string]                                                                                                                                                                   | 请输入号牌号码 |
| disabled              | 是否禁用         | ^[boolean]                                                                                                                                                                  | false          |
| clearable             | 是否显示清除按钮 | ^[boolean]                                                                                                                                                                  | false          |
