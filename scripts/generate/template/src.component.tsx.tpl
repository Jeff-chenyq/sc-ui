import { useNamespace } from '@sc-ui/hooks'
import { defineComponent } from 'vue'
import { <%= camelCaseName %>Props } from './utils'

const ns = useNamespace('<%= name %>')

export default defineComponent({
  name: 'Sc<%= pascalCaseName %>',

  props: <%= camelCaseName %>Props,

  emits: [],

  setup(props, { emit, slots }) {
    return () => <div class={ns.b()}><%= pascalCaseName %></div>
  }
})
