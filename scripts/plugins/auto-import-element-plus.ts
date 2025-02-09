import { Plugin } from 'rollup'
import { kebabCase } from 'unplugin-vue-components'

export default function autoImportElementPlusStyles(): Plugin {
  // 需要引入样式的组件列表
  const components = [
    'ElAffix',
    'ElAlert',
    'ElAutocomplete',
    // 'ElAutoResizer',
    'ElAvatar',
    'ElBacktop',
    'ElBadge',
    'ElBreadcrumb',
    'ElBreadcrumbItem',
    'ElButton',
    'ElButtonGroup',
    'ElCalendar',
    'ElCard',
    'ElCarousel',
    'ElCarouselItem',
    'ElCascader',
    'ElCascaderPanel',
    'ElCheckTag',
    'ElCheckbox',
    'ElCheckboxButton',
    'ElCheckboxGroup',
    'ElCol',
    'ElCollapse',
    'ElCollapseItem',
    'ElCollapseTransition',
    'ElColorPicker',
    'ElConfigProvider',
    'ElContainer',
    'ElAside',
    'ElFooter',
    'ElHeader',
    'ElMain',
    'ElDatePicker',
    'ElDescriptions',
    'ElDescriptionsItem',
    'ElDialog',
    'ElDivider',
    'ElDrawer',
    'ElDropdown',
    'ElDropdownItem',
    'ElDropdownMenu',
    'ElEmpty',
    'ElForm',
    'ElFormItem',
    'ElIcon',
    'ElImage',
    'ElImageViewer',
    'ElInput',
    'ElInputNumber',
    'ElInputTag',
    'ElLink',
    'ElMenu',
    'ElMenuItem',
    'ElMenuItemGroup',
    'ElSubMenu',
    'ElPageHeader',
    'ElPagination',
    'ElPopconfirm',
    'ElPopover',
    'ElPopper',
    'ElProgress',
    'ElRadio',
    'ElRadioButton',
    'ElRadioGroup',
    'ElRate',
    'ElResult',
    'ElRow',
    'ElScrollbar',
    'ElSelect',
    'ElOption',
    'ElOptionGroup',
    'ElSelectV2',
    'ElSkeleton',
    'ElSkeletonItem',
    'ElSlider',
    'ElSpace',
    'ElStatistic',
    'ElCountdown',
    'ElSteps',
    'ElStep',
    'ElSwitch',
    'ElTable',
    'ElTableColumn',
    'ElTableV2',
    'ElTabs',
    'ElTabPane',
    'ElTag',
    'ElText',
    'ElTimePicker',
    'ElTimeSelect',
    'ElTimeline',
    'ElTimelineItem',
    'ElTooltip',
    'ElTooltipV2',
    'ElTransfer',
    'ElTree',
    'ElTreeSelect',
    'ElTreeV2',
    'ElUpload',
    'ElWatermark',
    'ElTour',
    'ElTourStep',
    'ElAnchor',
    'ElAnchorLink',
    'ElSegmented',
    'ElMention'
  ]

  const styleImportsMap = new Map() // 存储每个模块需要导入的样式

  return {
    name: 'auto-import-element-plus-styles', // 插件名称

    transform(code, id) {
      // 检查是否是从 'element-plus' 导入
      if (code.includes('element-plus')) {
        const matches = code.match(
          /import\s+{([^}]+)}\s+from\s+['"]element-plus['"]/
        ) // 匹配导入的组件

        if (matches && matches[1]) {
          // 获取所有导入的组件名称
          const importedComponents = matches[1]
            .split(',')
            .map((comp) => comp.trim())

          // 遍历每个导入的组件，检查是否在 components 列表中
          const neededStyles = []
          importedComponents.forEach((component) => {
            if (components.includes(component)) {
              // 如果组件在 components 数组中，自动添加对应的样式导入
              const componentName = kebabCase(component.slice(2))
              const styleImport = `import 'element-plus/es/components/${componentName}/style/css';`
              neededStyles.push(styleImport)
            }
          })

          if (neededStyles.length > 0) {
            // 将所需样式存储在 map 中
            styleImportsMap.set(id, neededStyles.join('\n'))
          }
        }
      }

      return {
        code, // 返回原始代码
        map: null // 不处理源映射
      }
    },

    generateBundle(options, bundle) {
      // 遍历所有的模块
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'chunk') {
          const originalCode = chunk.code
          let newCode = originalCode

          // 检查该模块是否需要导入样式
          if (styleImportsMap.has(chunk.facadeModuleId)) {
            const styleImports = styleImportsMap.get(chunk.facadeModuleId)
            // 将样式导入语句插入到代码开头
            newCode = `${styleImports}\n${originalCode}`
          }

          // 更新模块代码
          chunk.code = newCode
        }
      }
    }
  }
}
