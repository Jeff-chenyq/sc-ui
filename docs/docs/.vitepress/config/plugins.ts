import path from 'path'
import fs from 'fs'
import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import Token from 'markdown-it/lib/token.mjs'
import { highlight } from '../utils/highlight'
import { docRoot } from './global'
const localMd = MarkdownIt()

interface ContainerOpts {
  marker?: string | undefined
  validate?(params: string): boolean
  render?(tokens: Token[], index: number): string
}

export const mdPlugin = (md: MarkdownIt) => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens, idx) {
      // tokens 示例
      // [
      //   { type: 'container_demo_open', nesting: 1, info: 'demo 一个简单的示例', ... },
      //   { type: 'paragraph_open', nesting: 1, ... },
      //   { type: 'inline', content: 'example-file', ... }, // 存储文件名
      //   { type: 'paragraph_close', nesting: -1, ... },
      //   { type: 'container_demo_close', nesting: -1, ... }
      // ]

      const m = tokens[idx].info.trim().match(/^demo\s+(.*)$/)
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : ''
        const sourceFileToken = tokens[idx + 2]
        let source = ''
        // demo文件名称
        const sourceFile = sourceFileToken.children?.[0].content ?? ''
        if (sourceFileToken.type === 'inline') {
          // 读取示列代码文件
          source = fs.readFileSync(path.resolve(docRoot, 'examples', `${sourceFile}.vue`), 'utf-8')
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)
        // opening tag
        return `<Demo
          source="${encodeURIComponent(highlight(source, 'vue'))}"
          path="${sourceFile}"
          raw-source="${encodeURIComponent(source)}"
          description="${encodeURIComponent(localMd.render(description))}">`
      } else {
        // closing tag
        return '</Demo>\n'
      }
    }
  } as ContainerOpts)
}
