import { withInstall } from '@sc-ui/utils'
import type { SFCWithInstall } from '@sc-ui/utils'
import SchemaForm from './src/schema-form'

export const ScSchemaForm: SFCWithInstall<typeof SchemaForm> =
  withInstall(SchemaForm)
export default ScSchemaForm

export * from './src/utils'
export * from './src/types'
