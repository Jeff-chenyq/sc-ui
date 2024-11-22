import DefaultTheme from 'vitepress/theme'
import { VPDemo } from '../components/vp-demo'
import 'element-plus/dist/index.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('Demo', VPDemo)
  }
}
