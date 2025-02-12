import { withInstall } from '@sc-ui/utils'
import type { SFCWithInstall } from '@sc-ui/utils'
import SchemaFormContainer from './src/schema-form-container'

export const ScSchemaFormContainer: SFCWithInstall<typeof SchemaFormContainer> = withInstall(SchemaFormContainer)
export default ScSchemaFormContainer

export * from './src/utils'
