import type { DefaultTheme } from 'vitepress'

function getGuideSidebar(): DefaultTheme.SidebarItem[] {
  const guideConfig: DefaultTheme.SidebarItem[] = [
    {
      text: '基础',
      items: [
        {
          text: '快速开始',
          link: '/guide/quickstart'
        }
      ]
    }
  ]

  return guideConfig.map((child) => mapPrefix(child, '/zh-CN'))
}

function getComponentSidebar(): DefaultTheme.SidebarItem[] {
  const componentConfig: DefaultTheme.SidebarItem[] = [
    {
      text: '组件',
      items: [
        {
          link: '/text-ellipsis',
          text: 'TextEllipsis 文本省略'
        },
        {
          link: '/plate-number',
          text: 'PlateNumber 车牌组件'
        },
        {
          link: '/fixed-virtual-list',
          text: 'FixedVirtualList 定高虚拟列表'
        },
        {
          link: '/dynamic-virtual-list',
          text: 'DynamicVirtualList 动态虚拟列表'
        },
        {
          link: '/magnifier',
          text: 'Magnifier 放大镜'
        },
        {
          link: '/schema-form',
          text: 'SchemaForm 配置表单'
        },
        {
          link: '/schema-form-container',
          text: 'SchemaFormContainer 查询容器组件'
        },
        {
          link: '/echart',
          text: 'Echart 图表组件'
        }
      ]
    }
  ]

  return componentConfig.map((child) => mapPrefix(child, '/zh-CN/component'))
}

function mapPrefix(item: DefaultTheme.SidebarItem, prefix = '') {
  if (item.items && item.items.length) {
    return {
      ...item,
      items: item.items.map((child) => mapPrefix(child, prefix))
    }
  } else {
    return {
      ...item,
      link: `${prefix}${item.link}`
    }
  }
}

const getSidebars = () => {
  return {
    '/zh-CN/guide/': getGuideSidebar(),
    '/zh-CN/component/': getComponentSidebar()
  }
}

export const sidebar = getSidebars()
