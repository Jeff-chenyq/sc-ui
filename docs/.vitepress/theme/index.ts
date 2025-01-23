import DefaultTheme from 'vitepress/theme'
import vpApiTyping from '../components/globals/vp-api-typing.vue'
import { VPDemo } from '../components/vp-demo'
import 'element-plus/dist/index.css'
import '@jeffchen123/sc-ui/dist/index.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('Demo', VPDemo)
    app.component('ApiTyping', vpApiTyping)
  }
}
