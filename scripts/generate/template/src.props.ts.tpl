import { buildProps } from '@sc-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type <%= pascalCaseName %> from './<%= name %><%= type === 'sfc' ? '.vue' : '' %>'

export const <%= name %>Props = buildProps({} as const)

export type <%= pascalCaseName %>Props = ExtractPropTypes<typeof <%= name %>Props>

export const <%= name %>Emits = {}

export type <%= pascalCaseName %>Emits = typeof <%= name %>Emits

export type <%= pascalCaseName %>Instance = InstanceType<typeof <%= pascalCaseName %>>
