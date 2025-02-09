import { useNamespace } from '@sc-ui/hooks'
import { ElTooltip } from 'element-plus'
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onUnmounted,
  nextTick,
  watch
} from 'vue'
import { textEllipsisProps } from './utils'

const ns = useNamespace('text-ellipsis')

export default defineComponent({
  name: 'ScTextEllipsis',

  components: {
    ElTooltip
  },

  props: textEllipsisProps,

  emits: [],

  setup(props, { emit, slots }) {
    const text = ref(props.content)
    // 是否展开
    const expanded = ref(false)
    const hasAction = ref(false)
    const root = ref<HTMLDivElement>()
    const actionRef = ref<HTMLSpanElement>()

    const activeText = computed(() => {
      return expanded.value ? props.collapseText : props.expandText
    })

    watch(
      () => [props.content, props.rows],
      () => {
        calcEllipsised()
      }
    )

    onMounted(() => {
      window.addEventListener('resize', calcEllipsised)
      calcEllipsised()

      if (slots.action) {
        nextTick(() => {
          calcEllipsised()
        })
      }
    })

    onUnmounted(() => {
      window.removeEventListener('resize', calcEllipsised)
    })

    function cloneContainer() {
      if (!root.value || !root.value.isConnected) return

      const originStyle = window.getComputedStyle(root.value)
      const container = document.createElement('div')
      const styleNames: string[] = Array.prototype.slice.apply(originStyle)

      styleNames.forEach((name) => {
        container.style.setProperty(name, originStyle.getPropertyValue(name))
      })

      container.style.position = 'fixed'
      container.style.zIndex = '-9999'
      container.style.top = '-9999px'
      container.style.height = 'auto'
      container.style.minHeight = 'auto'
      container.style.maxHeight = 'auto'

      container.innerText = props.content
      document.body.appendChild(container)

      return container
    }

    // 10.55px => 10.55
    const pxToNum = (value: string | null) => {
      if (!value) return 0
      const match = value.match(/^\d*(\.\d*)?/)
      return match ? Number(match[0]) : 0
    }

    function calcEllipsisText(container: HTMLElement, maxHeight: number) {
      const { content, dots, expandText } = props
      const end = content.length

      const actionHtml = slots.action
        ? (actionRef.value?.outerHTML ?? '')
        : expandText

      const tail = (left: number, right: number) => {
        if (right - left <= 1) {
          return content.slice(0, left) + dots
        }

        const middle = Math.round((left + right) / 2)

        const textStr = content.slice(0, middle)
        container.innerText = textStr + dots
        container.innerHTML += actionHtml

        if (container.offsetHeight > maxHeight) {
          return tail(left, middle)
        } else {
          return tail(middle, right)
        }
      }

      return tail(0, end)
    }

    function calcEllipsised() {
      const container = cloneContainer()

      if (!container) return

      const { paddingBottom, paddingTop, lineHeight } = container.style

      const maxHeight = Math.ceil(
        (Number(props.rows) + 0.5) * pxToNum(lineHeight) +
          pxToNum(paddingTop) +
          pxToNum(paddingBottom)
      )

      if (maxHeight < container.offsetHeight) {
        hasAction.value = true
        text.value = calcEllipsisText(container, maxHeight)
      } else {
        hasAction.value = false
        text.value = props.content
      }

      document.body.removeChild(container)
    }

    function renderAction() {
      const action = slots.action
        ? slots.action({ expanded: expanded.value })
        : activeText.value

      return (
        <span
          ref={actionRef}
          class={ns.e('action')}
          onClick={() => {
            expanded.value = !expanded.value
          }}>
          {action}
        </span>
      )
    }

    return () => {
      return (
        <ElTooltip
          disabled={
            !props.showTip ||
            !hasAction.value ||
            !!props.expandText ||
            !!slots.action
          }
          content={props.content}
          placement='top'>
          <div ref={root} class={ns.b()}>
            {expanded.value ? props.content : text.value}
            {hasAction.value ? renderAction() : null}
          </div>
        </ElTooltip>
      )
    }
  }
})
