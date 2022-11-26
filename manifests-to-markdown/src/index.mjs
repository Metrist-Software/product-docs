import { config } from '../config.mjs'
import { mkdtemp } from 'node:fs/promises'

export const maybeMakeTmpDirectory = async (newFolderPath) => {
  try {
    return await mkdtemp(newFolderPath)
  } catch (err) {
    return newFolderPath
  }
}

maybeMakeTmpDirectory(`${config.__vitepressMonitorsFolder}/tmp-`)
