import eslintConfig from '@jeffchen123/eslint-config'

export default [
  ...eslintConfig,
  {
    ignores: ['docs/docs/.vitepress/cache/*']
  }
]
