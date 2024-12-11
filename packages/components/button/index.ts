import { withInstall } from '@sc-ui/utils'
import type { SFCWithInstall } from '@sc-ui/utils'
import Button from './src/button.vue'

export const ScButton: SFCWithInstall<typeof Button> = withInstall(Button)
export default ScButton

export * from './src/button'
