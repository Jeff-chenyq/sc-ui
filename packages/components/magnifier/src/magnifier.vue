<template>
  <div
    ref="imgWrapRef"
    :class="ns.b()"
    :style="{ 'background-color': hasLoadError ? 'unset' : backgroundColor }"
    @click="$emit('handle-click')"
  >
    <div v-if="hasLoadError" :class="ns.e('error')">
      <slot name="error"></slot>
    </div>

    <!-- 图片展示区 -->
    <img
      v-else
      ref="imgRef"
      :class="ns.e('display-img')"
      :src="src"
      :style="imageStyle"
      @load="handleLoad"
      @error="handleError"
    />

    <!-- 鼠标跟随小阴影 -->
    <div
      v-show="show && !hasLoadError"
      :class="ns.e('mouse-mask')"
      :style="{
        width: `${mouseMaskSize.width}px`,
        height: `${mouseMaskSize.height}px`,
        transform: `translate3d(${mouseMaskPos.x - mouseMaskSize.width / 2}px, ${
          mouseMaskPos.y - mouseMaskSize.height / 2
        }px, 0)`
      }"
    ></div>

    <!-- 放大镜 -->
    <Teleport to="body">
      <div v-show="show && !hasLoadError" :class="ns.e('container')">
        <div
          :class="ns.e('view-wrap')"
          :style="{
            width: `${viewSize.width}px`,
            height: `${viewSize.height}px`,
            transform: `translate(${
              viewPos.x - viewSize.width - mouseMaskSize.width / 2 - gap
            }px, ${viewPos.y - viewSize.height - mouseMaskSize.height / 2}px)`
          }"
        >
          <div
            :class="ns.e('big-img-wrap')"
            :style="{
              width: `${scale * wrapSize.width}px`,
              height: `${scale * wrapSize.height}px`
            }"
          >
            <img
              :class="ns.e('display-img')"
              :src="src"
              :style="{
                width: '100%',
                height: '100%',
                transform: `translate(${-mouseMaskPos.x * scale + viewSize.width / 2}px, ${
                  -mouseMaskPos.y * scale + viewSize.height / 2
                }px)`,
                ...imageStyle
              }"
            />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@sc-ui/hooks'
import { ref, onMounted, onBeforeUnmount, computed, nextTick, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { magnifierEmits, magnifierProps } from './magnifier'

const ns = useNamespace('magnifier')

defineOptions({
  name: 'ScMagnifier'
})

const props = defineProps(magnifierProps)

defineEmits(magnifierEmits)

const show = ref(false)
const hasLoadError = ref(false)

let resizeOberver = null

const imageStyle = computed<CSSProperties>(() => {
  const { fit } = props
  if (fit) {
    return { objectFit: fit }
  }

  return {}
})

watch(
  () => props.src,
  () => {
    hasLoadError.value = false
  }
)

// ====================== ref =======================
const imgRef = ref<HTMLImageElement>()
const imgWrapRef = ref<HTMLDivElement>()

// ====================== mask =======================
const mouseMaskPos = ref({
  x: 0,
  y: 0
})

const viewPos = ref({
  x: 0,
  y: 0
})

function handleMouseMove(e) {
  const { offsetX, offsetY, clientX, clientY } = e
  show.value = true
  requestAnimationFrame(() => {
    mouseMaskPos.value = {
      x: offsetX,
      y: offsetY
    }

    viewPos.value = {
      x: clientX,
      y: clientY
    }
  })
}

function handleMouseOut() {
  show.value = false
}

async function handleLoad(event: Event) {
  hasLoadError.value = false
  await nextTick()
  bindEvents()
}

function handleError(event: Event) {
  hasLoadError.value = true
  unbindEvents()
}

// ====================== wrapSize =======================
const wrapSize = ref({
  width: 0,
  height: 0
})

function getWrapSize() {
  const { clientWidth, clientHeight } = imgWrapRef.value
  wrapSize.value = {
    width: clientWidth,
    height: clientHeight
  }
}

function bindEvents() {
  getWrapSize()

  imgRef.value.addEventListener('mousemove', handleMouseMove)
  imgRef.value.addEventListener('mouseout', handleMouseOut)

  resizeOberver = new ResizeObserver(() => {
    getWrapSize()
  })

  resizeOberver.observe(imgWrapRef.value)
}

function unbindEvents() {
  imgRef.value.removeEventListener('mousemove', handleMouseMove)
  imgRef.value.removeEventListener('mouseout', handleMouseOut)
  resizeOberver.disconnect()
  resizeOberver = null
}

// ====================== events =======================

onMounted(() => {
  bindEvents()
})

onBeforeUnmount(() => {
  unbindEvents()
})
</script>
