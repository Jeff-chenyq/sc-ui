declare module 'vue' {
  export interface GlobalComponents {
    ScPlateNumber: (typeof import('@jeffchen123/sc-ui'))['ScPlateNumber']
  }
}

export {}
