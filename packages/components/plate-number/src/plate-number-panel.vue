<template>
  <div :class="ns.e('panel')">
    <div :class="ns.e('tip')">新能源</div>
    <div :class="ns.em('panel', 'input')">
      <input
        v-for="(_, index) in plate"
        v-model="plate[index]"
        :class="activeIdx === index && ns.is('active')"
        type="text"
        maxlength="1"
        readonly
        @click="onInputClick(index)"
      />
    </div>
    <div :class="ns.em('panel', 'num')">
      <div
        v-for="(item, index) in renderNumList"
        :class="[
          ns.m('keyboard'),
          index === renderNumList.length - 1 && ns.is('delete')
        ]"
        @click="keyboardClick(item, index === renderNumList.length - 1)"
      >
        <template v-if="index !== renderNumList.length - 1">{{
          item
        }}</template>
        <template v-else>
          <el-icon>
            <Delete />
          </el-icon>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import { useNamespace } from '@sc-ui/hooks'
import { ElIcon } from 'element-plus'
import { ref, computed } from 'vue'
import { startList, letterList, digitList, specialList } from './consts'
import {
  plateNumberPanelProps,
  plateNumberPanelEmits
} from './plate-number-panel'

const props = defineProps(plateNumberPanelProps)
const emit = defineEmits(plateNumberPanelEmits)

// 键盘一排个数
const KEYBORD_SIZE = 10
const PLATE_NUMBER_SIZE = 8

const ns = useNamespace('plate-number')

const plate = computed({
  get: () => {
    const val = props.modelValue.split('')
    return [
      ...val,
      ...Array.from({ length: PLATE_NUMBER_SIZE - val.length }).fill('')
    ] as string[]
  },
  set: (val) => emit('update:modelValue', val.join(''))
})

const activeIdx = ref(0)

const numList = computed(() => {
  if (activeIdx.value === 0) {
    return startList
  } else if (activeIdx.value === 1) {
    return letterList
  } else if (activeIdx.value !== 6) {
    return [...digitList, ...letterList]
  } else {
    return [...digitList, ...letterList, ...specialList]
  }
})

// 真实渲染键盘list（补全空位）
const renderNumList = computed(() => {
  // 加入删除按钮占位
  let arr = [...numList.value, '']

  const size = arr.length % KEYBORD_SIZE
  if (size === 0) {
    return arr
  } else {
    return [
      ...arr,
      ...Array.from({ length: KEYBORD_SIZE - size }).fill('')
    ] as string[]
  }
})

function onInputClick(index: number) {
  emit('panelInputClick', index)
}

/**
 * 设置input 选中 index
 * @param index
 */
function setActiveIdx(index: number) {
  if (index > PLATE_NUMBER_SIZE - 1) {
    activeIdx.value = PLATE_NUMBER_SIZE - 1
    return
  }
  activeIdx.value = index
}

/**
 * 快捷键盘点击
 * @param item 点击的字符
 * @param isDelete 是否是删除按钮
 */
function keyboardClick(item: string, isDelete: boolean) {
  if (isDelete) {
    emit('deleteIconClick')
    return
  }

  if (!item) {
    onInputClick(activeIdx.value)
    return
  }

  const val = item.split('')

  // TODO 若有值是仅仅替换，还是后面全部替换，需要根据需求修改
  const arr = plate.value.slice(0, activeIdx.value).concat(val)
  plate.value = [
    ...arr,
    ...Array.from({ length: PLATE_NUMBER_SIZE - arr.length }).fill('')
  ] as string[]

  onInputClick(activeIdx.value + val.length)
}

defineExpose({
  /**
   * @description 设置panel当前选中的input index
   */
  setActiveIdx
})
</script>

<style lang="scss" scoped></style>
