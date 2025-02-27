# ScUI

创建一个属于自己的简易 vue3 组件库，整合业务组件，实现组件快速复用，可维护

## 在线文档地址

https://jeff-chenyq.github.io/sc-ui/

## 新增组件

组件名格式：小写 + 短横杠

```ts
pnpm gen
```

## 链接本地依赖

```shell
# get dist
pnpm build
cd dist/sc-ui
# set cur sc-ui to global `node_modules`
pnpm link --global
# for esm we also need link sc-ui for dist
pnpm link --global @jeffchen123/sc-ui

# go to your project, link to `sc-ui`
cd your-project
pnpm link --global @jeffchen123/sc-ui
```
