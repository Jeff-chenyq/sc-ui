import type { MarkdownRenderer } from 'vitepress'
import { ApiTableContainer } from '../plugins/api-table'
import { demoContainer } from '../plugins/demo'
import tooltip from '../plugins/tooltip'

export const mdPlugin = (md: MarkdownRenderer) => {
  md.use(tooltip)
  demoContainer(md)
  md.use(ApiTableContainer)
}
