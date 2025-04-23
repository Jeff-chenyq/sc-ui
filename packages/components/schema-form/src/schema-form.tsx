import { ScPlateNumber } from '@sc-ui/components'
import { useNamespace } from '@sc-ui/hooks'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElSwitch,
  ElDatePicker,
  ElTimePicker,
  ElSelect,
  ElOption,
  ElRadioGroup,
  ElRadio,
  ElCheckboxGroup,
  ElCheckbox
} from 'element-plus'
import { defineComponent, computed, ref } from 'vue'
import type { SchemaFormItem } from './types'
import { schemaFormProps } from './utils'

const ns = useNamespace('schema-form')

export default defineComponent({
  name: 'ScSchemaForm',

  props: schemaFormProps,

  emits: [],

  setup(props, { emit, slots, expose, attrs }) {
    /**
     * rules添加默认message
     * TODO: 针对具体组件类型，匹配默认的trigger
     */
    const finalRules = computed(() => {
      if (!props.rules) return undefined
      const rules = {} as Record<string, any>
      Object.keys(props.rules).forEach((key) => {
        const arr = props.rules![key]
        const formItem = props.formItemList.find((item) => item.prop === key)
        const message = formItem?.label || ''
        const compType = formItem?.compType
        const isSelect = ['SELECT', 'CHECKBOX_GROUP', 'RADIO_GROUP'].includes(
          compType!
        )

        if (arr instanceof Array) {
          rules[key] = arr.map((rule: any) => {
            return {
              ...rule,
              message:
                rule.message ??
                (isSelect ? `请选择${message}` : `请输入${message}`)
            }
          })
        } else {
          rules[key] = [
            {
              ...arr,
              message:
                arr.message ??
                (isSelect ? `请选择${message}` : `请输入${message}`)
            }
          ]
        }
      })

      return rules
    })

    const gridColumns = computed(() => {
      if (props.gridCols === 'auto') {
        return `repeat(auto-fill, minmax(${props.gridFr}px, 1fr))`
      }
      return `repeat(${props.gridCols}, 1fr)`
    })

    const gridStyle = computed(() => {
      if (!props.gridLayout)
        return {
          gap: props.gridGap
        }

      return {
        'grid-template-columns': gridColumns.value,
        gap: props.gridGap
      }
    })

    function renderFormItem(item: SchemaFormItem) {
      const {
        compType,
        label,
        prop,
        formItemSlots,
        formItemProps,
        fieldProps,
        fieldSlots
      } = item

      const commomProps = {
        clearable: true
      }

      // 简单组件映射
      const simpleCompMap = {
        INPUT: {
          component: ElInput,
          placeholder: '请输入'
        },
        INPUT_NUMBER: {
          component: ElInputNumber,
          placeholder: '请输入'
        },
        SWITCH: {
          component: ElSwitch
        },
        TIME_PICKER: {
          component: ElTimePicker,
          placeholder: '请选择'
        },
        DATE_PICKER: {
          component: ElDatePicker,
          placeholder: '请输入'
        },
        PLATE_NUMBER: {
          component: ScPlateNumber,
          placeholder: '请输入'
        }
      }

      const complexCompMap = {
        SELECT: {
          component: ElSelect,
          childComp: ElOption,
          placeholder: '请选择'
        },
        RADIO_GROUP: {
          component: ElRadioGroup,
          childComp: ElRadio
        },
        CHECKBOX_GROUP: {
          component: ElCheckboxGroup,
          childComp: ElCheckbox
        }
      } as const

      const renderComp = () => {
        if (simpleCompMap[compType]) {
          const { component: Comp, placeholder } = simpleCompMap[compType]
          return (
            <Comp
              key={prop}
              v-model={props.model[prop]}
              placeholder={placeholder + label}
              {...commomProps}
              {...(fieldProps || {})}>
              {fieldSlots}
            </Comp>
          )
        } else if (complexCompMap[compType]) {
          const { optionList, labelKey, valueKey } = fieldProps || {}
          const {
            component: Comp,
            childComp: Child,
            placeholder
          } = complexCompMap[compType]
          return (
            <Comp
              key={prop}
              v-model={props.model[prop]}
              placeholder={placeholder + label}
              {...commomProps}
              {...(fieldProps || {})}>
              {optionList?.map((option) => (
                <Child
                  key={option[valueKey]}
                  label={option[labelKey || 'label']}
                  value={option[valueKey || 'value']}
                />
              ))}
            </Comp>
          )
        } else if (compType === 'CUSTOM') {
          return item?.render()
        }
      }

      function getFormItemGridStyle() {
        if (!props.gridLayout) return {}

        const { gridItem } = formItemProps || {}

        if (gridItem?.isFull) {
          return {
            gridColumn: `1 / -1`
          }
        }
        return {
          gridColumn: gridItem?.gridStyle
        }
      }
      return (
        <ElFormItem
          {...Object.assign({ prop, label }, formItemProps || {})}
          style={getFormItemGridStyle()}>
          {{
            default: () => renderComp(),
            label: ({ label: labelText }: { label: string }) =>
              formItemSlots?.label?.(labelText),
            error: ({ error: errorText }: { error: string }) =>
              formItemSlots?.error?.(errorText)
          }}
        </ElFormItem>
      )
    }

    function getLabelWidth() {
      let max = -Infinity
      for (const item of props.formItemList) {
        if (item.label.length > max) {
          max = item.label.length
        }
      }

      return max + 2 + 'em'
    }

    const elFormRef = ref<InstanceType<typeof ElForm>>()

    expose(
      new Proxy(
        {},
        {
          get(_target, key: string) {
            if (!elFormRef.value) {
              console.warn('elFormRef is not initialized')
              return undefined
            }

            return elFormRef.value[key]
          },
          has(_target, key) {
            return key in elFormRef.value!
          }
        }
      )
    )

    return () => (
      <ElForm
        ref={elFormRef}
        class={ns.b()}
        {...props}
        {...attrs}
        rules={finalRules.value}
        label-width={
          !props.isAutoLabelWidth ? props.labelWidth : getLabelWidth()
        }>
        <div class={ns.e('grid-layout')} style={gridStyle.value}>
          {props.formItemList
            .filter((item) => {
              if (!item.hidden) return true

              if (typeof item.hidden === 'function') {
                return !item.hidden()
              }

              return !item.hidden
            })
            .map((item) => renderFormItem(item))}
        </div>
        {slots.other?.()}
      </ElForm>
    )
  }
})
