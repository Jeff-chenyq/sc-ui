import ScUI from '@jeffchen123/sc-ui'
import ElementPlus from 'element-plus'
import DefaultTheme from 'vitepress/theme'
import vpApiTyping from '../components/globals/vp-api-typing.vue'
import { VPDemo } from '../components/vp-demo'
import 'element-plus/dist/index.css'
import '../../../packages/theme-chalk/src/index.scss'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ScUI)
    app.use(ElementPlus)
    // 注册全局组件
    app.component('Demo', VPDemo)
    app.component('ApiTyping', vpApiTyping)
  }
}
