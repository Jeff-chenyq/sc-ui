declare module 'vue' {
  export interface GlobalComponents {
    ScPlateNumber: (typeof import('@jeffchen123/sc-ui'))['ScPlateNumber']
    ScFixedVirtualList: (typeof import('@jeffchen123/sc-ui'))['ScFixedVirtualList']
    ScDynamicVirtualList: (typeof import('@jeffchen123/sc-ui'))['ScDynamicVirtualList']
    ScTextEllipsis: (typeof import('@jeffchen123/sc-ui'))['ScTextEllipsis']
    ScMagnifier: (typeof import('@jeffchen123/sc-ui'))['ScMagnifier']
    ScSchemaForm: (typeof import('@jeffchen123/sc-ui'))['ScSchemaForm']
    ScSchemaFormContainer: (typeof import('@jeffchen123/sc-ui'))['ScSchemaFormContainer']
    ScEchart: (typeof import('@jeffchen123/sc-ui'))['ScEchart']
  }
}

export {}
