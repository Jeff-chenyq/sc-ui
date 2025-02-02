import { defineConfig } from 'vitepress'
import nav from './nav'
import { mdPlugin } from './plugins'
import { sidebar } from './sidebars'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/sc-ui/' : '/',
  appearance: false,
  lang: 'zh-CN',
  title: 'ScUI',
  description: 'JeffChen 业务组件库',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,
    logo: '/images/smarty.svg',
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Jeff-chenyq/sc-ui' }
    ],

    // 文章翻页
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    // 移动端 - 外观
    darkModeSwitchLabel: '外观',

    // 移动端 - 返回顶部
    returnToTopLabel: '返回顶部',

    // 移动端 - menu
    sidebarMenuLabel: '菜单',
    outline: {
      level: [2, 4],
      label: '页面导航'
    }
  },
  markdown: {
    image: {
      // 开启图片懒加载
      lazyLoading: true
    },
    config: (md) => mdPlugin(md)
  }
})
