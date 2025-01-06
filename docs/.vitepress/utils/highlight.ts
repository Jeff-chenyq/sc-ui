import chalk from 'chalk'
import consola from 'consola'
import escapeHtml from 'escape-html'
import prism from 'prismjs'
import loadLanguages from 'prismjs/components/index'

loadLanguages(['markup', 'css', 'javascript'])

function wrap(code: string, lang: string): string {
  if (lang === 'text') {
    code = escapeHtml(code)
  }
  // v-pre 避免被编译
  return `<pre v-pre><code>${code}</code></pre>`
}

export const highlight = (str: string, lang: string) => {
  if (!lang) {
    return wrap(str, 'text')
  }
  lang = lang.toLowerCase()
  const rawLang = lang
  if (lang === 'vue' || lang === 'html') {
    lang = 'markup'
  }
  if (lang === 'md') {
    lang = 'markdown'
  }
  if (lang === 'ts') {
    lang = 'typescript'
  }
  if (lang === 'py') {
    lang = 'python'
  }
  if (!prism.languages[lang]) {
    try {
      loadLanguages([lang])
    } catch {
      consola.warn(
        chalk.yellow(
          `[vitepress] Syntax highlight for language "${lang}" is not supported.`
        )
      )
    }
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang)
    return wrap(code, rawLang)
  }
  return wrap(str, 'text')
}
