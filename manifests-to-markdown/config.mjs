import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

export const config = {
  __vitepressMonitorsFolder: join(dirname(fileURLToPath(import.meta.url)), '../vitepress/docs/monitors/shared')
}
