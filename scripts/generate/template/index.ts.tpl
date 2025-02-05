import { withInstall } from '@sc-ui/utils'
import type { SFCWithInstall } from '@sc-ui/utils'
import <%= pascalCaseName %> from './src/<%= name %><%= type === 'sfc' ? '.vue' : '' %>'

export const Sc<%= pascalCaseName %>: SFCWithInstall<typeof <%= pascalCaseName %>> = withInstall(<%= pascalCaseName %>)
export default Sc<%= pascalCaseName %>

export * from './src/<%= type === 'sfc' ? name : 'utils' %>'
