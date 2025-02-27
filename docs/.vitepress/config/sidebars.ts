import type { DefaultTheme } from 'vitepress'
import sideCompList from './sideCompList'
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
      items: sideCompList.reverse()
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
