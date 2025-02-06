import { buildProps } from '@sc-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type Magnifier from './magnifier.vue'

export const magnifierProps = buildProps({
  src: {
    type: String,
    required: true
  },

  fit: {
    type: String,
    default: 'contain',
    values: ['', 'contain', 'cover', 'fill', 'none', 'scale-down']
  },

  /**
   * 鼠标跟随阴影尺寸
   */
  mouseMaskSize: {
    type: Object,
    default: () => {
      return {
        width: 75,
        height: 50
      }
    }
  },

  /**
   * 放大镜的尺寸（宽，高）
   */
  viewSize: {
    type: Object,
    default: () => {
      return {
        width: 600,
        height: 400
      }
    }
  },

  /**
   * 放大倍数
   */
  scale: {
    type: Number,
    default: 5
  },

  /**
   * 左侧放大镜和右侧鼠标阴影的间距
   */
  gap: {
    type: Number,
    default: 0
  },

  backgroundColor: {
    type: String,
    default: '#000'
  }
} as const)

export type MagnifierProps = ExtractPropTypes<typeof magnifierProps>

export const magnifierEmits = {
  // 'handle-click': (e: MouseEvent) => e instanceof MouseEvent
  'handle-click': () => true
}

export type MagnifierEmits = typeof magnifierEmits

export type MagnifierInstance = InstanceType<typeof Magnifier>
