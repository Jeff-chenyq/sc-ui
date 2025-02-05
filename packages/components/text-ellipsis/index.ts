import { withInstall } from '@sc-ui/utils'
import type { SFCWithInstall } from '@sc-ui/utils'
import TextEllipsis from './src/text-ellipsis'

export const ScTextEllipsis: SFCWithInstall<typeof TextEllipsis> =
  withInstall(TextEllipsis)
export default ScTextEllipsis

export * from './src/utils'
