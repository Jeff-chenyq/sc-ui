declare module 'vue' {
  export interface GlobalComponents {
    ScPlateNumber: (typeof import('sc-ui'))['ScPlateNumber']
  }
}

export {}
