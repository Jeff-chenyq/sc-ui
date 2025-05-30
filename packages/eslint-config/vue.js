import configPrettier from 'eslint-config-prettier'
import pluginVue from 'eslint-plugin-vue'
import typescript from './typescript.js'

// https://eslint.vuejs.org/user-guide
/** @type {import('eslint').Linter.Config[]} */
export default [
  // typescript
  ...typescript,

  // https://eslint.vuejs.org/user-guide/#bundle-configurations
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/max-attributes-per-line': 'off',
      'vue/no-v-html': 'off',
      'vue/require-prop-types': 'off',
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/prefer-import-from-vue': 'off',
      'vue/require-v-for-key': 'off'
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },

  // https://github.com/prettier/eslint-config-prettier
  // Turns off all rules that are unnecessary or might conflict with Prettier.
  configPrettier
]
