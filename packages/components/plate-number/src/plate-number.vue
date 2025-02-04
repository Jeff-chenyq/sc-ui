<template>
  <div
    v-click-outside:[contentRef]="clickOutsideFn"
    :class="ns.b()"
    @click.capture="clickFn"
  >
    <ElPopover
      ref="popoverRef"
      :placement="placement"
      :visible="visible"
      :show-arrow="false"
      :offset="4"
      :width="390"
      :popper-class="ns.e('popover')"
    >
      <template #reference>
        <ElInput
          ref="inputRef"
          v-model.trim="numValue"
          :class="ns.e('input')"
          :placeholder="placeholder"
          :clearable="clearable"
          :disabled="disabled"
          maxlength="8"
          @keydown="onInputKeydown"
          @keyup="onInputKeyup"
          @click="onInputClick"
        ></ElInput>
      </template>
      <template #default>
        <PlateNumberPanel
          ref="panelRef"
          v-model="numValue"
          @panel-input-click="panelInputClick"
          @delete-icon-click="deleteIconClick"
        />
      </template>
    </ElPopover>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@sc-ui/hooks'
import { ElPopover, ElInput, ClickOutside, InputInstance } from 'element-plus'
import { computed, ref, onMounted, nextTick, watch } from 'vue'
import { plateNumberEmits, plateNumberProps } from './plate-number'
import { PlateNumberPanelInstance } from './plate-number-panel'
import PlateNumberPanel from './plate-number-panel.vue'

const ns = useNamespace('plate-number')

defineOptions({
  name: 'ScPlateNumber'
})

const props = defineProps(plateNumberProps)
const emit = defineEmits(plateNumberEmits)

const vClickOutside = ClickOutside

const numValue = computed({
  get: () => {
    emit('update:modelValue', props.modelValue.toUpperCase())
    return props.modelValue.toUpperCase()
  },
  set: (val) => emit('update:modelValue', val.toUpperCase())
})

const visible = ref(false)
const contentRef = ref()
const popoverRef = ref()
const inputRef = ref<InputInstance>()
const panelRef = ref<PlateNumberPanelInstance>()

watch(numValue, (val) => {
  if (!val) {
    setActiveIdx()
  }
})

onMounted(() => {
  contentRef.value = popoverRef.value.popperRef.contentRef
})

function clickOutsideFn() {
  visible.value = false
}

function clickFn(e: MouseEvent) {
  if (props.disabled) {
    e.stopPropagation()
    visible.value = false
    return
  }

  visible.value = true
}

/**
 * 选中input中字符
 * @param index 字符index
 */
function setSelectionRange(index: number) {
  const input = inputRef.value.$refs.input as HTMLInputElement
  input.focus()
  input.setSelectionRange(index, index + 1)
}

function onInputKeydown(e: KeyboardEvent) {
  const { key } = e

  const deletKeys = ['Delete', 'Backspace']

  // 如果已选中，清掉选中字符后字符
  const input = inputRef.value.$refs.input as HTMLInputElement
  if (!deletKeys.includes(key) && input.selectionStart !== input.selectionEnd) {
    numValue.value = numValue.value.slice(0, input.selectionStart)
  } else if (
    deletKeys.includes(key) &&
    input.selectionStart !== input.selectionEnd
  ) {
    numValue.value = numValue.value.slice(0, input.selectionStart + 1)
  }
}

function onInputKeyup(e: KeyboardEvent) {
  setActiveIdx()
}

function onInputClick() {
  setActiveIdx()
}

/**
 * 根据光标设置 panel input 中选中字符
 */
async function setActiveIdx() {
  await nextTick()
  const input = inputRef.value.$refs.input as HTMLInputElement
  panelRef.value.setActiveIdx(input.selectionStart)
}

/**
 * panel input 点击
 * @param index 点击的index
 */
function panelInputClick(index: number) {
  setSelectionRange(index)
  setActiveIdx()
}

/**
 * 删除图标点击
 */
async function deleteIconClick() {
  const input = inputRef.value.$refs.input as HTMLInputElement
  if (input.selectionStart === input.selectionEnd) {
    numValue.value = numValue.value.slice(0, input.selectionStart - 1)
  } else {
    numValue.value = numValue.value.slice(0, input.selectionStart)
  }
  await nextTick()
  input.focus()
  setActiveIdx()
}
</script>
