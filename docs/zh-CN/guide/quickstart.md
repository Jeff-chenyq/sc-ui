---
title: 快速开始
lang: zh-CN
---

# 快速开始

本节将介绍如何在项目中使用。

## 安装

::: code-group

```shell [npm]
$ npm install @jeffchen123/sc-ui --save
```

```shell [yarn]
$ yarn add @jeffchen123/sc-ui
```

```shell [pnpm]
$ pnpm install @jeffchen123/sc-ui
```

:::

## 用法

### 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```ts
// main.ts
import { createApp } from 'vue'
import ScUI from '@jeffchen123/sc-ui'
import '@jeffchen123/sc-ui/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ScUI)
app.mount('#app')
```

#### Volar 支持

如果您使用 Volar，请在 `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型。

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["@jeffchen123/sc-ui/global"]
  }
}
```

### 按需导入

您需要使用额外的插件来导入要使用的组件。

#### 自动导入

首先你需要安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```shell
npm install -D unplugin-vue-components unplugin-auto-import
```

然后把下列代码插入到你的 `Vite` 或 `Webpack` 的配置文件中

##### Vite

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// 已经将resolver 打包在组件库中
import { ScUIResolver } from '@jeffchen123/sc-ui/es/resolver'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ScUIResolver()]
    }),
    Components({
      resolvers: [ScUIResolver()]
    })
  ]
})
```

<!-- ##### Webpack

```js
// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // ...
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
}
``` -->
