import { buildProps } from '@sc-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type <%= pascalCaseName %> from './<%= name %><%= type === 'sfc' ? '.vue' : '' %>'

export const <%= camelCaseName %>Props = buildProps({} as const)

export type <%= pascalCaseName %>Props = ExtractPropTypes<typeof <%= camelCaseName %>Props>

export const <%= camelCaseName %>Emits = {}

export type <%= pascalCaseName %>Emits = typeof <%= camelCaseName %>Emits

export type <%= pascalCaseName %>Instance = InstanceType<typeof <%= pascalCaseName %>>
