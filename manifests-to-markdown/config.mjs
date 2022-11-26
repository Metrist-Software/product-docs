import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

export const config = {
  __vitepressMonitorsDirectory: join(dirname(fileURLToPath(import.meta.url)), '../vitepress/docs/monitors/shared'),
  __manifestsDirectory: join(dirname(fileURLToPath(import.meta.url)), './manifests')
}
