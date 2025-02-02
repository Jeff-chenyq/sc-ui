import ScUI from '@jeffchen123/sc-ui'
import ElementPlus from 'element-plus'
import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import confetti from '../components/globals/confetti.vue'
import vpApiTyping from '../components/globals/vp-api-typing.vue'
import VPApp from '../components/vp-app.vue'
import { VPDemo } from '../components/vp-demo'
import 'element-plus/dist/index.css'
import '../../../packages/theme-chalk/src/index.scss'
import './style/index.css'

export default {
  extends: DefaultTheme,
  Layout: VPApp,
  enhanceApp({ app }) {
    app.use(ScUI)
    app.use(ElementPlus)
    // 注册全局组件
    app.component('Demo', VPDemo)
    app.component('ApiTyping', vpApiTyping)
    app.component('Confetti', confetti)
  }
} as Theme
