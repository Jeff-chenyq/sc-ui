import type { Plugin } from 'rollup'
import { PKG_NAME, PKG_PREFIX } from '../build/utils/consts'

// 主要是替换样式文件引入路径
export function ScUiAlias(): Plugin {
  const themeChalk = 'theme-chalk'

  const sourceThemeChalk = `${PKG_PREFIX}/${themeChalk}` as const
  const bundleThemeChalk = `${PKG_NAME}/${themeChalk}` as const

  return {
    name: 'sc-ui-alias-plugin',

    // 用于决定如何解析模块标识符（即模块路径）
    resolveId(id) {
      if (!id.startsWith(sourceThemeChalk)) {
        return
      }

      return {
        id: id.replace(sourceThemeChalk, bundleThemeChalk),
        // 指定此模块应被视为外部模块，并且其路径是绝对路径。这意味着 Rollup 不会尝试将其打包进最终的输出文件中，而是保留原始的导入语句
        external: 'absolute'
      }
    }
  }
}
