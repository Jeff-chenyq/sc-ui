import { stylelintPackage, getPackageDependencies } from '@sc-ui/build'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['index'],
  clean: true,
  declaration: false,
  rollup: {
    emitCJS: true
  },
  externals: [
    ...getPackageDependencies(stylelintPackage).dependencies,
    ...getPackageDependencies(stylelintPackage).peerDependencies
  ]
})
