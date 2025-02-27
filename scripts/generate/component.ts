import path from 'path'
import { fileURLToPath } from 'url'
import { compRoot, docRoot, themeRoot, typingsRoot } from '@sc-ui/build'
import fs from 'fs-extra'
import { template, camelCase, upperFirst } from 'lodash-es'
import prompts from 'prompts'

// 组件名称格式
function checkComponentName(name: string) {
  // return !/^[a-z][a-z|-]*[a-z]$/.test(name)
  const strictKebabCasePattern = /^(?!-)(?!.*-$)[a-z]+(-[a-z]+)*$/
  return !strictKebabCasePattern.test(name)
}

// 组件是否存在
function checkComponentExist(name: string) {
  return fs.existsSync(
    path.resolve(process.cwd(), `./packages/components/${name}`)
  )
}

/**
 * 获取需要创建的文件
 */
const getCreatedFiles = (name: string, type?: string) => {
  return [
    {
      file: 'index.ts', // 生成的文件
      template: 'index.ts.tpl' // 由哪个模板生成文件
    },
    {
      file: type === 'tsx' ? 'src/utils.ts' : `src/${name}.ts`,
      template: 'src.props.ts.tpl'
    },
    type === 'tsx'
      ? {
          file: `src/${name}.tsx`,
          template: 'src.component.tsx.tpl'
        }
      : {
          file: `src/${name}.vue`,
          template: 'src.component.vue.tpl'
        },
    {
      file: `__tests__/${name}.test.tsx`,
      template: '__tests__.component.test.tsx.tpl'
    },
    {
      file: `style/index.ts`,
      template: 'style.index.ts.tpl'
    },
    {
      file: `style/css.ts`,
      template: 'style.css.ts.tpl'
    },
    {
      file: `${name}.scss`,
      template: 'style.component.scss.tpl',
      isThemeChalk: true
    },
    {
      file: `examples/${name}/basic.vue`,
      template: 'docs.basic.tpl',
      isDoc: true
    },
    {
      file: `zh-CN/component/${name}.md`,
      template: 'docs.README.tpl',
      isDoc: true
    }
  ]
}

/**
 * 新增组件时自动添加需要的引入
 */
function insertComponent(name: string) {
  const pascalCaseName = upperFirst(camelCase(name))
  const list = [
    // index.scss 插入 样式引用
    {
      file: path.resolve(themeRoot, 'src/index.scss'),
      operate: (code: string) => {
        return `${code}@use './${name}.scss';\n`
      }
    },
    // global.d.ts 引入
    {
      file: path.resolve(typingsRoot, 'global.d.ts'),
      operate: (code: string) => {
        return code.replace(
          'export interface GlobalComponents {',
          `export interface GlobalComponents {\n    Sc${pascalCaseName}: (typeof import('@jeffchen123/sc-ui'))['Sc${pascalCaseName}']`
        )
      }
    },
    // components.ts 引入
    {
      file: path.resolve(compRoot, 'index.ts'),
      operate: (code: string) => {
        return `${code}export * from './${name}'\n`
      }
    },
    // siddebars.ts
    {
      file: path.resolve(docRoot, '.vitepress/config/sideCompList.ts'),
      operate: (code: string) => {
        // 使用正则匹配数组的最后一项位置

        const newItem = `\n  {\n    link: '/${name}',\n    text: '${pascalCaseName}'\n  },`

        return code.replace('export default [', `export default [${newItem}`)
      }
    }
  ]

  list.forEach(async (item) => {
    const code = await fs.readFile(item.file, 'utf-8')

    const finalCode = item.operate(code)
    await fs.outputFile(item.file, finalCode)
  })
}

/**
 * 添加一个组件
 */
const addComponent = async (name: string, type?: string) => {
  insertComponent(name)

  getCreatedFiles(name, type).forEach(async (item) => {
    // esmodule 新方式
    const __dirname = fileURLToPath(new URL('.', import.meta.url))
    // 读取模板
    const tplPath = path.resolve(__dirname, `./template/${item.template}`)
    let data = await fs.readFile(tplPath, 'utf-8')

    // 编译模板
    const compiled = template(data)
    data = compiled({
      name,
      type,
      camelCaseName: camelCase(name),
      pascalCaseName: upperFirst(camelCase(name))
    })

    // 输入模板
    const filePath = item.isThemeChalk
      ? 'packages/theme-chalk/src'
      : item.isDoc
        ? 'docs'
        : 'packages/components'
    const outputPath = path.resolve(
      process.cwd(),
      !item.isThemeChalk && !item.isDoc
        ? `${filePath}/${name}/${item.file}`
        : `${filePath}/${item.file}`
    )
    await fs.outputFile(outputPath, data)
    console.log(`已创建：${outputPath}`)
  })
}

async function init() {
  const result = await prompts([
    {
      type: 'text',
      name: 'name',
      message: '输入组件名称',
      validate: (name) => {
        if (checkComponentName(name)) {
          return '组件名称请使用(kebab-case)方式命名！'
        }
        if (checkComponentExist(name)) {
          return `组件库中已经存在名为${name}的组件！`
        }
        return true
      }
    },
    {
      type: 'select',
      name: 'type',
      message: '选择组件模板',
      choices: [
        { title: 'sfc', value: 'sfc' },
        { title: 'tsx', value: 'tsx' }
      ]
    }
  ])
  console.log('参数:', result)

  const { name, type } = result
  addComponent(name, type)
}

init()
