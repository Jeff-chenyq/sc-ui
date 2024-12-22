import fs from 'fs-extra'
import { buildOutput } from '../utils/path'

export const clean = async () => {
  await Promise.all([fs.remove(buildOutput)])
}
