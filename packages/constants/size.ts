export const componentSizes = ['', 'default', 'small', 'large'] as const

export type componentSize = (typeof componentSizes)[number]

export const componentSizeMap = {
  large: 40,
  default: 32,
  small: 24
} as const
