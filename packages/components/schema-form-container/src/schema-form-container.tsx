import { ArrowDown } from '@element-plus/icons-vue'
import { ScSchemaForm } from '@sc-ui/components'
import { useNamespace } from '@sc-ui/hooks'
import { ElButton } from 'element-plus'
import {
  defineComponent,
  ref,
  watch,
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  onUpdated
} from 'vue'
import { schemaFormContainerProps } from './utils'

const ns = useNamespace('schema-form-container')

const PADDING = 12

export default defineComponent({
  name: 'ScSchemaFormContainer',

  components: {
    ScSchemaForm,
    ElButton,
    ArrowDown
  },

  props: schemaFormContainerProps,

  emits: [],

  setup(props, { emit, slots, attrs }) {
    const schemaFormRef = ref()
    const isCollapse = ref(props.defaultCollapse)
    const formHeight = ref(0)

    const showCollapse = computed(() => formHeight.value > props.collapseHeight)

    watch(schemaFormRef, (val) => {
      if (val) {
        getHeight()
      }
    })

    async function getHeight() {
      if (schemaFormRef.value) {
        await nextTick()
        formHeight.value =
          (schemaFormRef.value.$el as HTMLElement)?.getBoundingClientRect()
            .height || 0
      }
    }

    function resetFields() {
      schemaFormRef.value?.resetFields?.()
      props?.onReset?.()
    }

    onMounted(() => {
      getHeight()
      window.addEventListener('resize', getHeight)
    })

    onUpdated(() => {
      getHeight()
    })

    onUnmounted(() => {
      window.removeEventListener('resize', getHeight)
    })

    return () => (
      <div
        class={ns.b()}
        style={{
          height: `${(isCollapse.value ? props.collapseHeight : formHeight.value) + PADDING * 2}px`
        }}>
        {/* TODO: ref={schemaFormRef} 获取不到 组件 expose的方法，暂时使用getInstance方法代替 */}
        <ScSchemaForm
          {...props}
          {...attrs}
          getInstance={(instance) => (schemaFormRef.value = instance)}
          gridLayout={true}
          gridCols='auto'>
          {{
            other: () => (
              <div class={ns.e('search-wrap')}>
                {showCollapse.value && (
                  <div
                    class={ns.e('collapse-btn')}
                    onClick={() => (isCollapse.value = !isCollapse.value)}>
                    {slots?.collapseBtn?.({ isCollapse: isCollapse.value }) || (
                      <div
                        class={[
                          ns.em('collapse-btn', 'default'),
                          isCollapse.value && ns.is('collapse')
                        ]}>
                        <span>{isCollapse.value ? '展开' : '收起'}</span>
                        <ArrowDown />
                      </div>
                    )}
                  </div>
                )}

                <div class={ns.e('btn-group')}>
                  {slots?.searchBtn?.() || (
                    <div>
                      <ElButton onClick={() => resetFields()}>重置</ElButton>
                      <ElButton
                        type='primary'
                        onClick={() => props?.onSearch?.()}>
                        查询
                      </ElButton>
                    </div>
                  )}
                </div>
              </div>
            )
          }}
        </ScSchemaForm>
      </div>
    )
  }
})
