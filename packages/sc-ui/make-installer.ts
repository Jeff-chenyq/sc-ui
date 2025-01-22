import { INSTALLED_KEY } from '@sc-ui/constants'
import type { ConfigProviderContext } from 'element-plus'
import { provideGlobalConfig } from 'element-plus'
import type { App, Plugin } from 'vue'
export const makeInstaller = (components: Plugin[] = []) => {
  // TODO 插件自动引入时，应该是 el-config-provider 提供配置，全局引入时，由options配置.此处暂时先留着口子，后续根据自己业务传属性
  const install = (app: App, options?: ConfigProviderContext) => {
    if (app[INSTALLED_KEY]) return

    app[INSTALLED_KEY] = true

    components.forEach((c) => {
      app.use(c)
    })

    if (options) provideGlobalConfig(options, app, true)
  }

  return {
    install
  }
}
