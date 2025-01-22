# ScUI

创建一个属于自己的简易 vue3 组件库，整合业务组件，实现组件快速复用，可维护

# 组件库文档

https://jeff-chenyq.github.io/sc-ui/

# 本地调试打包产物(play)

`pnpm dev`

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
