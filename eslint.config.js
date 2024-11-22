import eslintConfig from '@sc-ui/eslint-config'

export default [
  ...eslintConfig,
  {
    ignores: ['docs/docs/.vitepress/cache/*']
  }
]
