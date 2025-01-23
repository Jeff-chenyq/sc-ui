declare module 'vue' {
  export interface GlobalComponents {
    ScPlateNumber: (typeof import('@jeffchen123/sc-ui'))['ScPlateNumber']
    ScFixedVirtualList: (typeof import('@jeffchen123/sc-ui'))['ScFixedVirtualList']
    ScDynamicVirtualList: (typeof import('@jeffchen123/sc-ui'))['ScDynamicVirtualList']
  }
}

export {}
