import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

export const config = {
  __manifestsDirectory: join(dirname(fileURLToPath(import.meta.url)), '../manifests'),
  __templatePath: join(dirname(fileURLToPath(import.meta.url)), './template.md'),
  __vitepressMonitorsDirectory: join(dirname(fileURLToPath(import.meta.url)), '../../vitepress/docs/monitors/shared')
}
