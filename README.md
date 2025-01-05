# sc-ui
  创建一个属于自己的简易 vue3 组件库，整合业务组件，实现组件快速复用，可维护
# 参考链接
  https://www.ydisp.cn/developer/118154.html
  https://blog.csdn.net/qq_32805013/article/details/134420142
  
  vitepress 插件：https://blog.csdn.net/cwin8951/article/details/130803402

# NOTE
1.之前eslint包不生效的原因是因为，根目录没有开启esmodule导致导入失效，查看type module,module,umd 等字段在package.json中的作用
2.ts 对于 vitepress .vitepress下的不生效，参考element-plus,显示include 文件夹后生效
3.新增eslint包，规范语法，基础js，vue，ts，prettier。eslint 9.x 和 8.x的区别及用法
4.新增stylelint子包，规范style
5.vitepress vue-demo 插件原理熟悉，可以直接在markdown 中使用vue组件，并提供复制等功能
6.新增快速生成组件模版，包含检测是否有重复组件，生成sfc，tsx组件。（学习element-plus shell脚本的创建组件的方式）

vue-tsc 版本有问题，暂时锁死 2.0.29, typescript 5.6.2 https://liubing.me/article/vue/search-string-not-found-supported-ts-extensions.html#%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88

gulp 5.0.0使用 @esbuild-kit/cjs-loader，命令行会找不到模块，显式用./node_modules,或者版本回退至4.x
# TODO
pnpm 使用 18.16.0，使用20.9.0的时候，安装子包报错，后续查看原因

1.buildProps 命方法补充（后续再学习
2.withInstall 方法补充
3.生成模板修改
4.play 测试 组件

12.24Todo:
1.完成样式打包
2.实现组件 resolver

3.组件库编辑器提示

## Link local dependencies

```shell
# get dist
pnpm build
cd dist/element-plus
# set cur element-plus to global `node_modules`
pnpm link --global
# for esm we also need link element-plus for dist
pnpm link --global element-plus

# go to your project, link to `element-plus`
cd your-project
pnpm link --global element-plus
```
