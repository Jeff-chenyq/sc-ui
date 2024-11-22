import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..', '..', '..')

export const docsDirName = 'docs/docs'

export const docRoot = resolve(projRoot, docsDirName)
