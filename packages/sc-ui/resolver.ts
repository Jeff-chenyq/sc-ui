import { kebabCase } from 'unplugin-vue-components'
import type {
  ComponentInfo,
  ComponentResolver,
  SideEffectsInfo
} from 'unplugin-vue-components/types'

const PKG_NAME = '@jeffchen123/sc-ui'

export interface ScUIResolverOptions {
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

export function ScUIResolver(
  options: ScUIResolverOptions = {}
): ComponentResolver[] {
  let optionsResolved: ScUIResolverOptions

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
  options: ScUIResolverOptions
): ComponentInfo | undefined {
  if (options.exclude && name.match(options.exclude)) return

  if (!name.match(/^Sc[A-Z]/)) return

  const partialName = kebabCase(name.slice(2)) // ElTableColumn -> table-column

  const { ssr } = options

  return {
    name,
    from: `${PKG_NAME}/${ssr ? 'lib' : 'es'}`,
    sideEffects: getSideEffects(partialName, options)
  }
}

function getSideEffects(
  name: string,
  options: ScUIResolverOptions
): SideEffectsInfo | undefined {
  const { importStyle, ssr } = options

  const themeFolder = `${PKG_NAME}/theme-chalk`
  const esComponentsFolder = `${PKG_NAME}/es/components`

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

// resolver 中 去引入 element-plus，解决样式丢失
// import { kebabCase } from 'unplugin-vue-components'
// import type {
//   ComponentInfo,
//   ComponentResolver,
//   SideEffectsInfo
// } from 'unplugin-vue-components/types'

// const PKG_NAME = '@jeffchen123/sc-ui'

// // TODO 写个插件，构建的时候，自动生成这个map(需要遍历子组件，避免漏掉)
// const importStyleMap = {
//   ScPlateNumber: ['ElInput', 'ElInput'],
//   ScSchemaForm: [
//     'ElForm',
//     'ElFormItem',
//     'ElInput',
//     'ElInputNumber',
//     'ElSwitch',
//     'ElDatePicker',
//     'ElTimePicker'
//   ]
// } as const

// export interface ScUIResolverOptions {
//   /**
//    * import style css or sass with components
//    *
//    * @default 'css'
//    */
//   importStyle?: boolean | 'css' | 'sass'

//   /**
//    * use commonjs lib & source css or scss for ssr
//    */
//   ssr?: boolean

//   /**
//    * exclude component name, if match do not resolve the name
//    */
//   exclude?: RegExp

//   /**
//    * a list of component names that have no styles, so resolving their styles file should be prevented
//    */
//   noStylesComponents?: string[]
// }

// const noStylesComponents: string[] = []

// export function ScUIResolver(
//   options: ScUIResolverOptions = {}
// ): ComponentResolver[] {
//   let optionsResolved: ScUIResolverOptions

//   function resolveOptions() {
//     if (optionsResolved) return optionsResolved
//     optionsResolved = {
//       ssr: false,
//       importStyle: 'css',
//       // directives: true,
//       exclude: undefined,
//       noStylesComponents: options.noStylesComponents || [],
//       // nightly: false,
//       ...options
//     }
//     return optionsResolved
//   }

//   return [
//     {
//       type: 'component',
//       resolve: async (name: string) => {
//         const options = resolveOptions()

//         if (
//           [
//             ...(options.noStylesComponents || []),
//             ...noStylesComponents
//           ].includes(name)
//         )
//           return resolveComponent(name, { ...options, importStyle: false })
//         else return resolveComponent(name, options)
//       }
//     }
//     // {
//     //   type: 'directive',
//     //   resolve: async (name: string) => {}
//     // }
//   ]
// }

// function resolveComponent(
//   name: string,
//   options: ScUIResolverOptions
// ): ComponentInfo | undefined {
//   if (options.exclude && name.match(options.exclude)) return

//   if (!name.match(/^Sc[A-Z]/)) return

//   const elementPlusImportStyles = importStyleMap[name] || []

//   const partialName = kebabCase(name.slice(2)) // ElTableColumn -> table-column

//   const { ssr } = options

//   return {
//     name,
//     from: `${PKG_NAME}/${ssr ? 'lib' : 'es'}`,
//     sideEffects: getSideEffects(partialName, options, elementPlusImportStyles)
//   }
// }

// function getSideEffects(
//   name: string,
//   options: ScUIResolverOptions,
//   elementPlusImportStyles?: string[]
// ): SideEffectsInfo | undefined {
//   const { importStyle, ssr } = options

//   const themeFolder = `${PKG_NAME}/theme-chalk`
//   const esComponentsFolder = `${PKG_NAME}/es/components`

//   let res: string[]

//   if (importStyle === 'sass') {
//     res = ssr
//       ? [`${themeFolder}/src/base.scss`, `${themeFolder}/src/${name}.scss`]
//       : [`${esComponentsFolder}/${name}/style/index`]
//   } else if (importStyle === true || importStyle === 'css') {
//     res = ssr
//       ? [`${themeFolder}/base.css`, `${themeFolder}/sc-${name}.css`]
//       : [`${esComponentsFolder}/${name}/style/css`]
//   }

//   const elImpot = getElementPlusStyles(elementPlusImportStyles)

//   return [...res, ...elImpot]
// }

// function getElementPlusStyles(elementPlusImportStyles: string[]): string[] {
//   if (!elementPlusImportStyles.length) return []
//   return elementPlusImportStyles.map((item) => {
//     return `element-plus/es/components/${kebabCase(item.slice(2))}/style/css`
//   })
// }
