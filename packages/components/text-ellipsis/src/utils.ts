import { buildProps } from '@sc-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type TextEllipsis from './text-ellipsis'

export const textEllipsisProps = buildProps({
  content: {
    type: String,
    default: ''
  },

  rows: {
    type: Number,
    default: 1
  },

  expandText: {
    type: String,
    default: ''
  },

  collapseText: {
    type: String,
    default: ''
  },

  dots: {
    type: String,
    default: '...'
  },

  showTip: {
    type: Boolean,
    default: false
  }
} as const)

export type TextEllipsisProps = ExtractPropTypes<typeof textEllipsisProps>

export const textEllipsisEmits = {}

export type TextEllipsisEmits = typeof textEllipsisEmits

export type TextEllipsisInstance = InstanceType<typeof TextEllipsis>
