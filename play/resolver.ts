import { kebabCase } from 'unplugin-vue-components'
import type {
  ComponentInfo,
  ComponentResolver,
  SideEffectsInfo
} from 'unplugin-vue-components/types'

export interface ScUiResolverOptions {
  /**
   * import style css or sass with components
   *
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'sass'

  /**
   * use commonjs lib & source css or scss for ssr
   */
  ssr?: boolean

  /**
   * exclude component name, if match do not resolve the name
   */
  exclude?: RegExp

  /**
   * a list of component names that have no styles, so resolving their styles file should be prevented
   */
  noStylesComponents?: string[]
}

const noStylesComponents: string[] = []

export function ScUiResolver(
  options: ScUiResolverOptions = {}
): ComponentResolver[] {
  let optionsResolved: ScUiResolverOptions

  function resolveOptions() {
    if (optionsResolved) return optionsResolved
    optionsResolved = {
      ssr: false,
      importStyle: 'css',
      // directives: true,
      exclude: undefined,
      noStylesComponents: options.noStylesComponents || [],
      // nightly: false,
      ...options
    }
    return optionsResolved
  }

  return [
    {
      type: 'component',
      resolve: async (name: string) => {
        const options = resolveOptions()

        if (
          [
            ...(options.noStylesComponents || []),
            ...noStylesComponents
          ].includes(name)
        )
          return resolveComponent(name, { ...options, importStyle: false })
        else return resolveComponent(name, options)
      }
    }
    // {
    //   type: 'directive',
    //   resolve: async (name: string) => {}
    // }
  ]
}

function resolveComponent(
  name: string,
  options: ScUiResolverOptions
): ComponentInfo | undefined {
  if (options.exclude && name.match(options.exclude)) return

  if (!name.match(/^Sc[A-Z]/)) return

  const partialName = kebabCase(name.slice(2)) // ElTableColumn -> table-column

  const { ssr } = options

  return {
    name,
    from: `sc-ui/${ssr ? 'lib' : 'es'}`,
    sideEffects: getSideEffects(partialName, options)
  }
}

function getSideEffects(
  name: string,
  options: ScUiResolverOptions
): SideEffectsInfo | undefined {
  const { importStyle, ssr } = options

  const themeFolder = 'sc-ui/theme-chalk'
  const esComponentsFolder = 'sc-ui/es/components'

  if (importStyle === 'sass') {
    return ssr
      ? [`${themeFolder}/src/base.scss`, `${themeFolder}/src/${name}.scss`]
      : [`${esComponentsFolder}/${name}/style/index`]
  } else if (importStyle === true || importStyle === 'css') {
    return ssr
      ? [`${themeFolder}/base.css`, `${themeFolder}/sc-${name}.css`]
      : [`${esComponentsFolder}/${name}/style/css`]
  }
}
